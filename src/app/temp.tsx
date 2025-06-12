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
  const [letterStatuses, setLetterStatuses] = useState<{
    [key: string]: "green" | "yellow" | "gray" | "default";
  }>({});

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

  const handleEnter = useCallback(async () => {
    if (currentAttempt.some((letter) => letter === "")) {
      setError("Please fill all boxes");
      return;
    }

    const word = currentAttempt.join("");
    const isValid = await isValidWord(word);

    if (!isValid) {
      setError("Not a valid word");
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
      if (gameOver) return;

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
    [gameOver, currentBox, handleBackspace, handleEnter, handleLetterInput]
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
        const status = letterStatuses[letter] || "default";
        const base =
          "w-8 h-10 flex items-center justify-center rounded font-medium text-sm cursor-pointer select-none transition-colors";

        switch (status) {
          case "green":
            return `${base} bg-green-500 text-white hover:bg-green-600`;
          case "yellow":
            return `${base} bg-yellow-500 text-white hover:bg-yellow-600`;
          case "gray":
            return `${base} bg-gray-500 text-white hover:bg-gray-600`;
          default:
            return `${base} ${
              darkMode
                ? "bg-zinc-700 text-white hover:bg-zinc-600"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`;
        }
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
    <div className={getBaseStyles.container} tabIndex={0}>
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${getBaseStyles.button}`}
          aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-4">Wordle Game</h1>

      {error && (
        <div className="text-red-500 text-sm font-medium mb-4" role="alert">
          {error}
        </div>
      )}

      {/* Game Board */}
      <div className="mt-8 space-y-2" role="grid" aria-label="Game board">
        {attempts.map((attempt, index) => (
          <div key={index} className="flex space-x-2" role="row">
            {attempt.word.split("").map((letter, letterIndex) => (
              <div
                key={letterIndex}
                className={getBaseStyles.tile(attempt.result[letterIndex])}
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
                  aria-label={`Empty box ${index + 1} in row ${rowIndex + 1}`}
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
            className={`px-4 py-2 rounded ${getBaseStyles.button}`}
          >
            Restart
          </button>
        </div>
      )}

      {/* Virtual Keyboard */}
      <div
        className="mt-8 space-y-2"
        role="group"
        aria-label="Virtual keyboard"
      >
        {keyboardRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center space-x-1">
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
        <div className="flex justify-center space-x-2">
          <button
            className={`px-4 py-2 rounded ${getBaseStyles.button} cursor-pointer`}
            onClick={handleBackspace}
            aria-label="Backspace"
            disabled={gameOver}
          >
            ⌫
          </button>
          <button
            className={`px-4 py-2 rounded ${getBaseStyles.button} cursor-pointer`}
            onClick={handleEnter}
            aria-label="Enter"
            disabled={gameOver}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
};

export default WordleGame;
