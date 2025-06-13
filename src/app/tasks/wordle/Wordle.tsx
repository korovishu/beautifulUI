```typescript
"use client";
import { useState, useEffect, useMemo, useCallback } from "react";

const words = [
  "APPLE",
  "BEACH",
  "BRAIN",
  "CHAIR",
  "DREAM",
  "EARTH",
  "FRUIT",
  "GHOST",
  "HEART",
  "HOUSE",
  "LIGHT",
  "MONEY",
  "MUSIC",
  "NIGHT",
  "OCEAN",
  "PAPER",
  "PARTY",
  "PLANT",
  "POWER",
  "QUEEN",
  "RADIO",
  "RIVER",
  "SMILE",
  "STONE",
  "STORE",
  "TABLE",
  "THING",
  "TIGER",
  "TRAIN",
  "VOICE",
  "WATER",
  "WOMAN",
  "WORLD",
  "YOUTH",
  "ZEBRA",
  "ALERT",
  "BLAZE",
  "CRANE",
  "DRINK",
  "ENJOY",
  "FLAME",
  "GRAPE",
  "HONEY",
  "INPUT",
  "JOKER",
  "KNOCK",
  "LEMON",
  "MAGIC",
];

const maxAttempts = 6;

type Attempt = {
  word: string;
  result: ("green" | "yellow" | "gray")[];
};

const WordleGame = () => {
  const [wordToGuess, setWordToGuess] = useState("");
  const [currentAttempt, setCurrentAttempt] = useState<string[]>(
    Array(5).fill("")
  );
  const [currentBox, setCurrentBox] = useState(0);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [error, setError] = useState("");
  const [showError, setShowError] = useState(false);
  const [showGame, setShowGame] = useState(false);
  const [letterStatuses, setLetterStatuses] = useState<{
    [key: string]: "green" | "yellow" | "gray" | "default";
  }>({});
  const [showInstructions, setShowInstructions] = useState(false);

  // Keyboard layout - memoize since it never changes
  const keyboardRows = useMemo(
    () => [
      ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
      ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
      ["Z", "X", "C", "V", "B", "N", "M"],
    ],
    []
  );

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setWordToGuess(words[randomIndex]);
  }, []);

  const handleLetterInput = useCallback(
    (letter: string) => {
      if (gameOver || currentBox >= 5) return;

      setCurrentAttempt((prev) => {
        const newAttempt = [...prev];
        newAttempt[currentBox] = letter;
        return newAttempt;
      });
      setCurrentBox((prev) => Math.min(prev + 1, 4));
      setError("");
    },
    [gameOver, currentBox]
  );

  const handleBackspace = useCallback(() => {
    if (currentBox > 0 || currentAttempt[currentBox] !== "") {
      setCurrentAttempt((prev) => {
        const newAttempt = [...prev];
        if (prev[currentBox] !== "") {
          newAttempt[currentBox] = "";
        } else {
          newAttempt[currentBox - 1] = "";
        }
        return newAttempt;
      });
      if (currentAttempt[currentBox] === "") {
        setCurrentBox((prev) => prev - 1);
      }
      setError("");
    }
  }, [currentBox, currentAttempt]);

  const isValidWord = useCallback(async (word: string) => {
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word.toLowerCase()}`
      );
      return response.ok;
    } catch {
      return words.includes(word);
    }
  }, []);

  const updateLetterStatuses = useCallback((attempt: Attempt) => {
    setLetterStatuses((prev) => {
      const newStatuses = { ...prev };
      attempt.word.split("").forEach((letter, index) => {
        const currentStatus = newStatuses[letter];
        const newStatus = attempt.result[index];

        if (
          !currentStatus ||
          currentStatus === "default" ||
          (currentStatus === "gray" &&
            (newStatus === "yellow" || newStatus === "green")) ||
          (currentStatus === "yellow" && newStatus === "green")
        ) {
          newStatuses[letter] = newStatus;
        }
      });
      return newStatuses;
    });
  }, []);

  const showTemporaryError = (message: string) => {
    setError(message);
    setShowError(true);
    setTimeout(() => {
      setShowError(false);
      setError("");
    }, 2000); // Hide after 2 seconds
  };

  const handleEnter = useCallback(async () => {
    if (currentAttempt.some((letter) => letter === "")) {
      showTemporaryError("Please fill all boxes");
      return;
    }

    const word = currentAttempt.join("");
    const isValid = await isValidWord(word);

    if (!isValid) {
      showTemporaryError("Not a valid word!");
      return;
    }

    const result = currentAttempt.map((letter: string, index: number) => {
      if (letter === wordToGuess[index]) {
        return "green";
      } else if (wordToGuess.includes(letter)) {
        return "yellow";
      } else {
        return "gray";
      }
    });

    const newAttempt = { word, result };
    setAttempts((prev) => [...prev, newAttempt]);
    updateLetterStatuses(newAttempt);
    setCurrentAttempt(Array(5).fill(""));
    setCurrentBox(0);
    setError("");
    setShowError(false);

    if (result.every((color) => color === "green")) {
      setGameOver(true);
    } else if (attempts.length + 1 >= maxAttempts) {
      setGameOver(true);
    }
  }, [
    currentAttempt,
    wordToGuess,
    attempts.length,
    isValidWord,
    updateLetterStatuses,
  ]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (gameOver || !showGame) return;

      // Ignore if Ctrl, Alt, or Meta is pressed (allow browser shortcuts)
      if (e.ctrlKey || e.altKey || e.metaKey) return;

      if (e.key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      } else if (e.key === "Enter") {
        e.preventDefault();
        handleEnter();
      } else if (/^[A-Za-z]$/.test(e.key) && currentBox < 5) {
        e.preventDefault();
        handleLetterInput(e.key.toUpperCase());
      }
    },
    [
      gameOver,
      currentBox,
      handleBackspace,
      handleEnter,
      handleLetterInput,
      showGame,
    ]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleKeyPress]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode((prev) => !prev);
  }, []);

  // Style utilities
  const getBaseStyles = useMemo(
    () => ({
      container: `min-h-screen flex flex-col justify-center items-center ${
        darkMode ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
      } p-4`,
      button: `${
        darkMode
          ? "bg-orange-500 hover:bg-orange-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      } transition-colors`,
      actionButton: `${
        "bg-gradient-to-r from-orange-600 to-pink-600 hover:from-orange-700 hover:to-pink-700 text-white" +
        " transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 font-medium"
      }`,
      tile: (color: string) => {
        const base =
          "flex justify-center items-center w-12 h-12 rounded-md text-white text-xl font-bold transition-colors";
        switch (color) {
          case "green":
            return `${base} bg-green-500`;
          case "yellow":
            return `${base} bg-yellow-500`;
          case "gray":
            return `${base} bg-gray-500`;
          default:
            return `${base} bg-transparent`;
        }
      },
      box: (index: number, letter: string, isCurrentAttempt: boolean) => {
        const base =
          "flex justify-center items-center w-12 h-12 rounded-md border-2 text-xl font-bold transition-all";
        if (isCurrentAttempt) {
          return `${base} ${darkMode ? "bg-zinc-800" : "bg-gray-200"} ${
            letter
              ? "border-gray-400"
              : currentBox === index
              ? "border-gray-400 border-2 animate-pulse"
              : "border-gray-300"
          }`;
        }
        return `${base} ${
          darkMode ? "bg-zinc-800" : "bg-gray-200"
        } border-gray-300`;
      },
      key: (letter: string) => {
        // Slightly darker color for Enter and Backspace
        const isSpecial = letter === "ENTER" || letter === "BACKSPACE";
        const status = letterStatuses[letter];
        if (!isSpecial && status && status !== "default") {
          let color = "";
          if (status === "green") color = "bg-green-500";
          else if (status === "yellow") color = "bg-yellow-500";
          else if (status === "gray") color = "bg-gray-700";
          return `w-10 h-12 flex items-center justify-center rounded-md font-bold text-base text-white my-0.5 mx-1 select-none transition-colors cursor-pointer ${color}`;
        }
        const base = `${
          isSpecial ? "bg-gray-700" : "bg-gray-500"
        } w-10 h-12 flex items-center justify-center rounded-md font-bold text-base text-white my-0.5 mx-1 select-none transition-colors cursor-pointer`;
        return base;
      },
    }),
    [darkMode, currentBox, letterStatuses]
  );

  // Memoize game over message
  const gameOverMessage = useMemo(() => {
    if (!gameOver) return null;
    return attempts[attempts.length - 1].result.every(
      (color) => color === "green"
    )
      ? "Congratulations! You won!"
      : `Game Over! The word was ${wordToGuess}`;
  }, [gameOver, attempts, wordToGuess]);

  return (
    <div
      className={getBaseStyles.container + " min-h-screen flex flex-col"}
      tabIndex={0}
    >
      {/* Header */}
      <header
        className={`w-full flex items-center justify-between px-4 py-3 z-20`}
      >
        <div className="flex-1 flex items-center gap-2 min-w-[180px]">
          {showGame && (
            <button
              onClick={() => setShowGame(false)}
              className={`px-4 py-2 rounded-lg ${getBaseStyles.actionButton} flex items-center gap-1.5 cursor-pointer`}
            >
              <span className="text-lg">←</span> Back to Home
            </button>
          )}
        </div>
        <div className="flex-1 flex justify-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent select-none">
            Wordle Game
          </span>
        </div>
        <div className="flex-1 flex items-center justify-end gap-2 min-w-[180px]">
          <button
            onClick={() => setShowInstructions(true)}
            className="mr-1 w-10 h-10 rounded-full shadow-md border-2 border-transparent bg-gradient-to-br from-orange-400 to-pink-400 text-white hover:from-orange-500 hover:to-pink-500 focus-visible:ring-2 focus-visible:ring-pink-400 transition-all duration-200 flex items-center justify-center cursor-pointer"
            aria-label="Show instructions"
          >
            <span className="text-2xl font-extrabold drop-shadow-sm">?</span>
          </button>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-full ${getBaseStyles.button} hover:scale-105 transition-transform cursor-pointer`}
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
          >
            {darkMode ? (
              // Sun icon for light mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <circle
                  cx="12"
                  cy="12"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 1v2m0 18v2m11-11h-2M3 12H1m16.95 7.07l-1.41-1.41M6.34 6.34L4.93 4.93m12.02 0l-1.41 1.41M6.34 17.66l-1.41 1.41"
                />
              </svg>
            ) : (
              // Moon icon for dark mode
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div
            className={`${
              darkMode ? "bg-zinc-900 text-white" : "bg-white text-gray-900"
            } rounded-xl shadow-2xl p-6 max-w-lg w-full relative animate-error-pop`}
          >
            <button
              onClick={() => setShowInstructions(false)}
              className={`absolute top-3 right-3 ${
                darkMode
                  ? "text-gray-400 hover:text-white"
                  : "text-gray-400 hover:text-gray-700"
              } text-2xl font-bold focus:outline-none cursor-pointer`}
              aria-label="Close instructions"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">How to Play</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-lg">
                  Guess the word in 6 tries. Each guess must be a valid 5-letter
                  word.
                </p>
                <div className="flex space-x-2">
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-green-500 text-white text-xl font-bold">
                    W
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    O
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    R
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    D
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    S
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  W is in the word and in the correct spot
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    P
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-yellow-500 text-white text-xl font-bold">
                    I
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    L
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    L
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    S
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  I is in the word but in the wrong spot
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex space-x-2">
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    V
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    A
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    G
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    U
                  </div>
                  <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                    E
                  </div>
                </div>
                <p className="text-sm text-gray-400">
                  None of these letters are in the word
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center justify-center">
        {!showGame ? (
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
              Welcome to Wordle
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">Game Rules</h2>
                <ul className="space-y-4 text-lg">
                  <li>• You have 6 attempts to guess the 5-letter word</li>
                  <li>• Each guess must be a valid English word</li>
                  <li>
                    • After each guess, the tiles will change color to show how
                    close you are
                  </li>
                  <li>
                    • You can use the on-screen keyboard or your physical
                    keyboard
                  </li>
                  <li>• Press Enter to submit your guess</li>
                  <li>• Press Backspace to delete letters</li>
                </ul>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-4">How to Play</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-lg">
                      Guess the word in 6 tries. Each guess must be a valid
                      5-letter word.
                    </p>
                    <div className="flex space-x-2">
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-green-500 text-white text-xl font-bold">
                        W
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        O
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        R
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        D
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        S
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      W is in the word and in the correct spot
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        P
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-yellow-500 text-white text-xl font-bold">
                        I
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        L
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        L
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        S
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      I is in the word but in the wrong spot
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex space-x-2">
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        V
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        A
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        G
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        U
                      </div>
                      <div className="flex justify-center items-center w-12 h-12 rounded-md bg-gray-500 text-white text-xl font-bold">
                        E
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">
                      None of these letters are in the word
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setShowGame(true)}
                className={`px-5 py-2.5 text-lg rounded-lg ${getBaseStyles.actionButton} transform hover:scale-105 transition-transform cursor-pointer`}
              >
                Start Playing
              </button>
            </div>
          </div>
        ) : (
          <>
            {showError && (
              <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50">
                <div className="animate-error-pop bg-white/90 dark:bg-zinc-800/90 rounded-xl shadow-2xl backdrop-blur-md px-8 py-4 flex items-center gap-4 border-t-4 border-red-500 min-w-[260px] max-w-xs mx-auto">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-7 h-7 text-red-500"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-base font-semibold text-red-600 dark:text-red-400">
                      {error}
                    </span>
                  </div>
                </div>
                <style>{`
                  @keyframes errorPop {
                    0% { opacity: 0; transform: scale(0.85) translateY(-20px); }
                    60% { opacity: 1; transform: scale(1.05) translateY(0); }
                    100% { opacity: 1; transform: scale(1) translateY(0); }
                  }
                  .animate-error-pop {
                    animation: errorPop 0.4s cubic-bezier(0.4,0,0.2,1);
                  }
                `}</style>
              </div>
            )}

            {/* Game Board */}
            <div className="mt-8 space-y-2" role="grid" aria-label="Game board">
              {attempts.map((attempt, index) => (
                <div key={index} className="flex space-x-2" role="row">
                  {attempt.word.split("").map((letter, letterIndex) => (
                    <div
                      key={letterIndex}
                      className={getBaseStyles.tile(
                        attempt.result[letterIndex]
                      )}
                      role="gridcell"
                      aria-label={`${letter} - ${attempt.result[letterIndex]}`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              ))}

              {/* Current attempt row */}
              {maxAttempts > attempts.length && (
                <div className="flex space-x-2" role="row">
                  {currentAttempt.map((letter, index) => (
                    <div
                      key={index}
                      className={getBaseStyles.box(index, letter, true)}
                      role="gridcell"
                      aria-label={letter ? letter : `Empty box ${index + 1}`}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
              )}

              {/* Empty rows */}
              {Array.from({ length: maxAttempts - attempts.length - 1 }).map(
                (_, rowIndex) => (
                  <div key={rowIndex} className="flex space-x-2" role="row">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div
                        key={index}
                        className={getBaseStyles.box(index, "", false)}
                        role="gridcell"
                        aria-label={`Empty box ${index + 1} in row ${
                          rowIndex + 1
                        }`}
                      />
                    ))}
                  </div>
                )
              )}
            </div>

            {gameOver && (
              <div className="text-center mt-4">
                <h2 className="text-2xl font-bold mb-2">{gameOverMessage}</h2>
                <button
                  onClick={() => window.location.reload()}
                  className={`px-6 py-2.5 rounded-lg ${getBaseStyles.actionButton}`}
                >
                  Play Again
                </button>
              </div>
            )}

            {/* Virtual Keyboard */}
            <div
              className="mt-8 space-y-2"
              role="group"
              aria-label="Virtual keyboard"
            >
              {/* First two rows */}
              {keyboardRows.slice(0, 2).map((row, rowIndex) => (
                <div key={rowIndex} className="flex justify-center">
                  {row.map((letter) => (
                    <button
                      key={letter}
                      className={getBaseStyles.key(letter)}
                      onClick={() => !gameOver && handleLetterInput(letter)}
                      aria-label={letter}
                      aria-pressed={letterStatuses[letter] !== "default"}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              ))}
              {/* Third row with Enter and Backspace */}
              <div className="flex justify-center">
                <button
                  className={getBaseStyles.key("ENTER") + " w-16"}
                  onClick={handleEnter}
                  aria-label="Enter"
                  disabled={gameOver}
                >
                  <span className="font-bold text-xs">ENTER</span>
                </button>
                {keyboardRows[2].map((letter) => (
                  <button
                    key={letter}
                    className={getBaseStyles.key(letter)}
                    onClick={() => !gameOver && handleLetterInput(letter)}
                    aria-label={letter}
                    aria-pressed={letterStatuses[letter] !== "default"}
                  >
                    {letter}
                  </button>
                ))}
                <button
                  className={getBaseStyles.key("BACKSPACE") + " w-10"}
                  onClick={handleBackspace}
                  aria-label="Backspace"
                  disabled={gameOver}
                >
                  {/* Standard backspace icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M20 7v10a2 2 0 0 1-2 2H8a2 2 0 0 1-1.7-.9l-4-6a2 2 0 0 1 0-2l4-6A2 2 0 0 1 8 5h10a2 2 0 0 1 2 2z" />
                    <line x1="12" y1="9" x2="15" y2="12" />
                    <line x1="15" y1="9" x2="12" y2="12" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer
        className={`w-full text-center py-4 ${
          darkMode
            ? "bg-zinc-900/80 text-gray-400"
            : "bg-white/80 text-gray-500"
        } text-sm shadow-inner backdrop-blur-md`}
      >
        © {new Date().getFullYear()} Wordle Game. All rights reserved.
      </footer>
    </div>
  );
};

export default WordleGame;
```