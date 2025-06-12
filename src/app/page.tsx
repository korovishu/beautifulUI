"use client";
import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MessageCircle,
  X,
  User,
  Send,
  Info,
  Eye,
  EyeOff,
} from "lucide-react";

// Theme context
type ThemeContextType = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Utility function to get local time
const getCurrentLocalTime = () => {
  return new Date().toLocaleString("en-US", {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
};

// Utility function to calculate time difference
const getTimeDifference = (dateString: string) => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid date";
    return formatDistanceToNow(date, { addSuffix: true });
  } catch {
    return "Invalid date";
  }
};

// Add global styles
const GlobalStyles = ({ isDarkMode }: { isDarkMode: boolean }) => (
  <style jsx global>{`
    /* Import modern sans-serif fonts */
    @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

    /* Reset styles and modern base */
    :root {
      --font-primary: "Plus Jakarta Sans", -apple-system, BlinkMacSystemFont,
        "Segoe UI", Roboto, sans-serif;
      --font-secondary: var(--font-primary);
    }

    /* Base typography */
    body {
      font-family: var(--font-primary);
      font-size: 16px;
      line-height: 1.5;
      color: ${isDarkMode ? "#e2e8f0" : "#1e293b"};
      background-color: ${isDarkMode ? "#0f172a" : "#f8fafc"};
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Consistent heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: var(--font-primary);
      font-weight: 700;
      line-height: 1.2;
      margin-bottom: 0.5em;
    }

    h1 {
      font-size: 2.5rem;
      font-weight: 800;
    }

    h2 {
      font-size: 2rem;
      font-weight: 700;
    }

    h3 {
      font-size: 1.75rem;
      font-weight: 600;
    }

    h4 {
      font-size: 1.5rem;
      font-weight: 600;
    }

    h5 {
      font-size: 1.25rem;
      font-weight: 500;
    }

    h6 {
      font-size: 1rem;
      font-weight: 500;
    }

    /* Consistent paragraph styles */
    p {
      font-family: var(--font-primary);
      font-size: 1rem;
      line-height: 1.6;
      margin-bottom: 1em;
    }

    /* Consistent link styles */
    a {
      font-family: var(--font-primary);
      color: ${isDarkMode ? "#60a5fa" : "#3b82f6"};
      text-decoration: none;
      transition: color 0.2s ease;
    }

    a:hover {
      color: ${isDarkMode ? "#93c5fd" : "#2563eb"};
      text-decoration: underline;
    }

    /* Consistent list styles */
    ul,
    ol {
      font-family: var(--font-primary);
      line-height: 1.6;
      margin-left: 1.5em;
      margin-bottom: 1em;
    }

    li {
      margin-bottom: 0.5em;
    }

    /* Input elements */
    input,
    textarea,
    select,
    button {
      font-family: var(--font-primary);
      font-size: 1rem;
    }

    /* Blockquote styling */
    blockquote {
      font-family: var(--font-secondary);
      font-size: 1.1rem;
      font-style: italic;
      border-left: 4px solid ${isDarkMode ? "#475569" : "#cbd5e1"};
      padding: 0.5em 1em;
      margin: 1em 0;
      color: ${isDarkMode ? "#94a3b8" : "#64748b"};
    }
  `}</style>
);

type Confession = {
  id: string;
  title: string;
  content: string;
  likes: number;
  likedBy: string[];
  comments: Comment[];
  timestamp: string;
};

type Comment = {
  id: string;
  confessionId: string;
  content: string;
  author: string;
  timestamp: string;
};

type User = {
  id: string;
  username: string;
  avatarUrl: string;
};

type ToastProps = {
  id: string;
  type: "success" | "error" | "info";
  message: string;
};

function Toast({ id, type, message }: ToastProps) {
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      toast.dismiss(id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      className={`px-4 py-3 rounded-lg shadow-lg flex items-center justify-between max-w-md w-full ${
        type === "success"
          ? "bg-emerald-500"
          : type === "error"
          ? "bg-rose-500"
          : "bg-blue-500"
      } ${isDarkMode ? "text-white" : "text-white"}`}
    >
      <span className="mr-4">{message}</span>
      <button
        onClick={() => toast.dismiss(id)}
        className="text-white hover:text-gray-200 transition-colors"
      >
        <X size={18} />
      </button>
    </motion.div>
  );
}

const toast = {
  queue: [] as ToastProps[],
  add: (toast: ToastProps) => {
    toast.queue.push(toast);
    if (toast.queue.length === 1) {
      toast.render();
    }
  },
  dismiss: (id: string) => {
    toast.queue = toast.queue.filter((toast) => toast.id !== id);
    toast.render();
  },
  render: () => {
    const ToastContainer = () => {
      const { isDarkMode } = useContext(ThemeContext);
      const [toasts, setToasts] = useState<ToastProps[]>(toast.queue);

      useEffect(() => {
        const updateToasts = () => {
          setToasts([...toast.queue]);
        };

        updateToasts();
      }, []);

      return (
        <div
          className={`fixed bottom-4 right-4 z-50 flex flex-col space-y-2 ${
            isDarkMode ? "bg-transparent" : "bg-transparent"
          }`}
        >
          <AnimatePresence>
            {toasts.map((toast) => (
              <Toast key={toast.id} {...toast} />
            ))}
          </AnimatePresence>
        </div>
      );
    };

    const container = document.getElementById("toast-container");
    if (container) {
      container.innerHTML = "";
      container.style.position = "fixed";
      container.style.bottom = "1rem";
      container.style.right = "1rem";
      container.style.zIndex = "9999";
      container.style.display = "flex";
      container.style.flexDirection = "column";
      container.style.alignItems = "flex-end";
      container.style.gap = "0.5rem";
      const root = createRoot(container);
      root.render(<ToastContainer />);
    } else {
      const newContainer = document.createElement("div");
      newContainer.id = "toast-container";
      newContainer.style.position = "fixed";
      newContainer.style.bottom = "1rem";
      newContainer.style.right = "1rem";
      newContainer.style.zIndex = "9999";
      newContainer.style.display = "flex";
      newContainer.style.flexDirection = "column";
      newContainer.style.alignItems = "flex-end";
      newContainer.style.gap = "0.5rem";
      document.body.appendChild(newContainer);
      const root = createRoot(newContainer);
      root.render(<ToastContainer />);
    }
  },
};

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
  id,
  name,
  required = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <input
      value={value}
      onChange={onChange}
      type={type}
      id={id}
      name={name}
      required={required}
      className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      } ${className}`}
      placeholder={placeholder}
    />
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  className = "",
  id,
  name,
  required = false,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
}) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <textarea
      value={value}
      onChange={onChange}
      id={id}
      name={name}
      required={required}
      className={`block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
        isDarkMode
          ? "bg-slate-800 border-slate-700 text-slate-200 placeholder-slate-500"
          : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
      } ${className}`}
      placeholder={placeholder}
      rows={4}
    />
  );
}

function Button({
  onClick,
  children,
  className = "",
  variant = "primary",
  disabled = false,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "danger" | "outline" | "ghost";
  disabled?: boolean;
}) {
  const { isDarkMode } = useContext(ThemeContext);

  const baseClasses = `inline-flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  const variantClasses = {
    primary: `bg-blue-600 hover:bg-blue-700 text-white ${
      isDarkMode ? "shadow-lg shadow-blue-900/30" : "shadow-md"
    }`,
    secondary: `bg-purple-600 hover:bg-purple-700 text-white ${
      isDarkMode ? "shadow-lg shadow-purple-900/30" : "shadow-md"
    }`,
    danger: `bg-rose-600 hover:bg-rose-700 text-white ${
      isDarkMode ? "shadow-lg shadow-rose-900/30" : "shadow-md"
    }`,
    outline: `border-2 ${
      isDarkMode
        ? "border-slate-600 hover:bg-slate-800"
        : "border-gray-300 hover:bg-gray-100"
    } ${isDarkMode ? "text-slate-200" : "text-gray-700"}`,
    ghost: `bg-transparent ${
      isDarkMode
        ? "hover:bg-slate-800 text-slate-300"
        : "hover:bg-gray-100 text-gray-600"
    }`,
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      disabled={disabled}
    >
      {children}
    </motion.button>
  );
}

function ConfessionCard({
  confession,
  onClick,
  isPopular,
  isDarkMode,
}: {
  confession: Confession;
  onClick: () => void;
  isPopular?: boolean;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={`p-6 rounded-xl shadow-lg overflow-hidden transition-all duration-300 cursor-pointer ${
        isDarkMode
          ? "bg-slate-800 hover:bg-slate-750 border border-slate-700"
          : "bg-white hover:bg-gray-50 border border-gray-200"
      } ${isPopular ? "border-l-4 border-l-blue-500" : ""}`}
      onClick={onClick}
    >
      <h3
        className={`text-lg font-semibold mb-2 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {confession.title}
      </h3>
      <p
        className={`text-sm mb-4 ${
          isDarkMode ? "text-slate-300" : "text-gray-600"
        }`}
      >
        {confession.content.length > 100
          ? `${confession.content.slice(0, 100)}...`
          : confession.content}
      </p>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <div className="flex items-center gap-2">
          <Heart size={14} className="text-rose-500 fill-current" />
          <span>{confession.likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageCircle size={14} />
          <span>{confession.comments.length}</span>
        </div>
        <span className={`${isDarkMode ? "text-slate-400" : "text-gray-500"}`}>
          {getTimeDifference(confession.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

function CommentList({
  comments,
  confessionId,
  onCommentSubmit,
  currentUser,
  isDarkMode,
}: {
  comments: Comment[];
  confessionId: string;
  onCommentSubmit: (content: string) => void;
  currentUser: User;
  isDarkMode: boolean;
}) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onCommentSubmit(content);
    setContent("");
  };

  return (
    <div>
      <h3
        className={`text-lg font-semibold mb-4 ${
          isDarkMode ? "text-white" : "text-gray-900"
        }`}
      >
        Comments
      </h3>

      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-1"
        />
        <Button
          type="submit"
          className="self-end"
          disabled={!content.trim()}
          variant="primary"
        >
          <Send size={16} />
        </Button>
      </form>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment.id}
              className={`p-4 rounded-lg ${
                isDarkMode
                  ? "bg-slate-750 border border-slate-700"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <span
                    className={`font-medium text-sm ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {comment.author}
                  </span>
                  <span
                    className={`text-xs ml-1 ${
                      isDarkMode ? "text-slate-400" : "text-gray-500"
                    }`}
                  >
                    • {getTimeDifference(comment.timestamp)}
                  </span>
                </div>
              </div>
              <p
                className={`text-sm ${
                  isDarkMode ? "text-slate-300" : "text-gray-600"
                }`}
              >
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

function ConfessionDetail({
  confession,
  onClose,
  onLike,
  onCommentSubmit,
  currentUser,
  isDarkMode,
}: {
  confession: Confession;
  onClose: () => void;
  onLike: () => void;
  onCommentSubmit: (content: string) => void;
  currentUser: User;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isDarkMode ? "bg-slate-900/80" : "bg-gray-900/80"
      }`}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`w-full max-w-2xl rounded-xl shadow-xl overflow-hidden ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {confession.title}
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              className={`rounded-full ${
                isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={20} />
            </Button>
          </div>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            Posted {getTimeDifference(confession.timestamp)}
          </p>
        </div>

        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <p
            className={`mb-6 ${
              isDarkMode ? "text-slate-300" : "text-gray-700"
            }`}
          >
            {confession.content}
          </p>

          <div className="flex gap-4 mb-6">
            <Button onClick={onLike} className="flex-1" variant="outline">
              <Heart size={18} className="mr-2" />
              {confession.likes}{" "}
              {confession.likedBy.includes(currentUser.id) ? "(Liked)" : ""}
            </Button>
            <Button className="flex-1" variant="outline">
              <MessageCircle size={18} className="mr-2" />
              Comment ({confession.comments.length})
            </Button>
          </div>

          <CommentList
            comments={confession.comments}
            confessionId={confession.id}
            onCommentSubmit={onCommentSubmit}
            currentUser={currentUser}
            isDarkMode={isDarkMode}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConfessionForm({
  onSubmit,
  onClose,
  isDarkMode,
}: {
  onSubmit: (title: string, content: string) => void;
  onClose: () => void;
  isDarkMode: boolean;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    onSubmit(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${
        isDarkMode ? "bg-slate-900/80" : "bg-gray-900/80"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`w-full max-w-md rounded-xl shadow-xl overflow-hidden ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        }`}
      >
        <div
          className={`p-6 border-b ${
            isDarkMode ? "border-slate-700" : "border-gray-200"
          }`}
        >
          <div className="flex justify-between items-center">
            <h2
              className={`text-xl font-semibold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Share Your Confession
            </h2>
            <Button
              onClick={onClose}
              variant="ghost"
              className={`rounded-full ${
                isDarkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"
              }`}
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label
              htmlFor="title"
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your confession a title"
              required
            />
          </div>
          <div>
            <label
              htmlFor="content"
              className={`block text-sm font-medium mb-1 ${
                isDarkMode ? "text-slate-200" : "text-gray-700"
              }`}
            >
              Your Confession
            </label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your confession..."
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!title.trim() || !content.trim()}
              variant="primary"
            >
              Post Confession
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function EmptyState({
  message,
  buttonText,
  onClick,
  isDarkMode,
}: {
  message: string;
  buttonText?: string;
  onClick?: () => void;
  isDarkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`p-12 rounded-xl text-center ${
        isDarkMode
          ? "bg-slate-800 border border-slate-700"
          : "bg-white border border-gray-200"
      }`}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
          <Info size={24} className="text-blue-600" />
        </div>
        <h3
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {message}
        </h3>
        {buttonText && onClick && (
          <Button onClick={onClick} variant="primary">
            {buttonText}
          </Button>
        )}
      </div>
    </motion.div>
  );
}

function ConfessionFeed() {
  // Get the current local time
  const currentLocalTime = getCurrentLocalTime();

  const { isDarkMode } = useContext(ThemeContext);
  const [currentUser, setCurrentUser] = useState<User>({
    id: "user-1",
    username: "Anonymous",
    avatarUrl: "",
  });
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [popularConfessions, setPopularConfessions] = useState<Confession[]>(
    []
  );
  const [selectedConfession, setSelectedConfession] =
    useState<Confession | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "popular">("all");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Function to generate a random time within the last 24 hours
  const generateRandomTimestamp = () => {
    const now = new Date();
    const randomHours = Math.floor(Math.random() * 24);
    const randomMinutes = Math.floor(Math.random() * 60);
    const randomTime = new Date(now);
    randomTime.setHours(randomTime.getHours() - randomHours);
    randomTime.setMinutes(randomTime.getMinutes() - randomMinutes);
    return randomTime.toISOString();
  };

  useEffect(() => {
    const demoConfessions: Confession[] = [
      {
        id: "confession-1",
        title: "Missing the old days",
        content:
          "I really miss the carefree days of my childhood. Everything felt simpler back then. I wonder what happened to that version of me.",
        likes: 12,
        likedBy: ["user-2", "user-3"],
        comments: [
          {
            id: "comment-1",
            confessionId: "confession-1",
            content: "Same here! Childhood was the best time of my life.",
            author: "user-2",
            timestamp: generateRandomTimestamp(),
          },
        ],
        timestamp: generateRandomTimestamp(),
      },
      {
        id: "confession-2",
        title: "Regret about college",
        content:
          "I wish I had taken my studies more seriously in college. Now I'm struggling to find a job that pays well and aligns with my passions. Anyone else feel the same?",
        likes: 8,
        likedBy: ["user-1", "user-4"],
        comments: [],
        timestamp: generateRandomTimestamp(),
      },
      {
        id: "confession-3",
        title: "Feeling stuck in life",
        content:
          "I feel like I'm just going through the motions of life without any real purpose. Has anyone found what they're truly passionate about and how did you get get",
        timestamp: generateRandomTimestamp(),
      },
      {
        id: "confession-4",
        title: "Regret about a past relationship",
        content:
          "I still can't stop thinking about my ex. It feels like I wasted years of my life on someone who didn't truly care about me. Anyone else go through this?",
        likes: 15,
        likedBy: ["user-5", "user-6", "user-7"],
        comments: [
          {
            id: "comment-2",
            confessionId: "confession-4",
            content:
              "Time heals all wounds. You'll find someone better suited for you!",
            author: "user-5",
            timestamp: generateRandomTimestamp(),
          },
          {
            id: "comment-3",
            confessionId: "confession-4",
            content: "Same here. But each experience makes us wiser.",
            author: "user-6",
            timestamp: generateRandomTimestamp(),
          },
        ],
        timestamp: generateRandomTimestamp(),
      },
      {
        id: "confession-5",
        title: "Struggling with anxiety",
        content:
          "I'm really struggling with anxiety and panic attacks. I feel like I'm constantly on edge and don't know how to calm myself down. Has anyone else dealt with this?",
        likes: 25,
        likedBy: ["user-1", "user-2", "user-3", "user-4", "user-5", "user-8"],
        comments: [
          {
            id: "comment-4",
            confessionId: "confession-5",
            content: "Try deep breathing exercises. They really help me.",
            author: "user-8",
            timestamp: generateRandomTimestamp(),
          },
          {
            id: "comment-5",
            confessionId: "confession-5",
            content: "Consider speaking to a therapist if you can.",
            author: "user-2",
            timestamp: generateRandomTimestamp(),
          },
          {
            id: "comment-6",
            confessionId: "confession-5",
            content: "You're not alone! Sending you lots of positive vibes.",
            author: "user-9",
            timestamp: generateRandomTimestamp(),
          },
        ],
        timestamp: generateRandomTimestamp(),
      },
    ];

    setConfessions(demoConfessions);
    const sortedByLikes = [...demoConfessions].sort(
      (a, b) => b.likes - a.likes
    );
    setPopularConfessions(sortedByLikes.slice(0, 3));

    setTimeout(() => {
      toast.add({
        id: "welcome-toast",
        type: "info",
        message: "Welcome to ConfessIT! Share your thoughts anonymously.",
      });
    }, 500);
  }, []);

  const handleSubmitConfession = (title: string, content: string) => {
    const newConfession: Confession = {
      id: `confession-${Date.now()}`,
      title,
      content,
      likes: 0,
      likedBy: [],
      comments: [],
      timestamp: new Date().toISOString(),
    };
    setConfessions([newConfession, ...confessions]);
    setShowForm(false);
    setPopularConfessions((prev) =>
      [...confessions, newConfession]
        .sort((a, b) => b.likes - a.likes)
        .slice(0, 3)
    );

    toast.add({
      id: `toast-${Date.now()}`,
      type: "success",
      message: "Confession posted successfully!",
    });
  };

  const handleLike = (confessionId: string) => {
    const updatedConfessions = confessions.map((confession) => {
      if (confession.id === confessionId) {
        const isLiked = confession.likedBy.includes(currentUser.id);
        return {
          ...confession,
          likes: isLiked ? confession.likes - 1 : confession.likes + 1,
          likedBy: isLiked
            ? confession.likedBy.filter((id) => id !== currentUser.id)
            : [...confession.likedBy, currentUser.id],
        };
      }
      return confession;
    });
    setConfessions(updatedConfessions);
    setPopularConfessions((prev) =>
      [...updatedConfessions].sort((a, b) => b.likes - a.likes).slice(0, 3)
    );

    if (selectedConfession && selectedConfession.id === confessionId) {
      setSelectedConfession(
        updatedConfessions.find((c) => c.id === confessionId) || null
      );
    }

    toast.add({
      id: `toast-${Date.now()}`,
      type: "info",
      message: `You ${
        confessions
          .find((c) => c.id === confessionId)
          ?.likedBy.includes(currentUser.id)
          ? "unliked"
          : "liked"
      } this confession`,
    });
  };

  const handleCommentSubmit = (confessionId: string, content: string) => {
    const updatedConfessions = confessions.map((confession) => {
      if (confession.id === confessionId) {
        const newComment: Comment = {
          id: `comment-${Date.now()}`,
          confessionId,
          content,
          author: currentUser.username,
          timestamp: new Date().toISOString(),
        };
        return {
          ...confession,
          comments: [...confession.comments, newComment],
        };
      }
      return confession;
    });
    setConfessions(updatedConfessions);
    setPopularConfessions((prev) =>
      [...updatedConfessions].sort((a, b) => b.likes - a.likes).slice(0, 3)
    );

    if (selectedConfession && selectedConfession.id === confessionId) {
      setSelectedConfession(
        updatedConfessions.find((c) => c.id === confessionId) || null
      );
    }

    toast.add({
      id: `toast-${Date.now()}`,
      type: "success",
      message: "Comment added successfully!",
    });
  };

  const handleShare = async (confession: Confession) => {
    try {
      await navigator.share({
        title: confession.title,
        text: confession.content,
        url: window.location.href,
      });
      toast.add({
        id: `toast-${Date.now()}`,
        type: "success",
        message: "Confession shared successfully!",
      });
    } catch (error) {
      toast.add({
        id: `toast-${Date.now()}`,
        type: "error",
        message: "Couldn't share confession.",
      });
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme: () => {} }}>
      <GlobalStyles isDarkMode={isDarkMode} />
      <div
        className={`min-h-screen ${
          isDarkMode ? "bg-slate-900" : "bg-gray-100"
        }`}
      >
        <header
          className={`sticky top-0 z-40 ${
            isDarkMode
              ? "bg-slate-800 shadow-lg shadow-slate-900/50"
              : "bg-white shadow-md"
          }`}
        >
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1
              className={`text-2xl font-bold ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              <span className="text-blue-600">Confess</span>IT
            </h1>

            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                className="rounded-full"
                onClick={() =>
                  toast.add({
                    id: `toast-${Date.now()}`,
                    type: "info",
                    message: "Theme switcher coming soon!",
                  })
                }
              >
                {isDarkMode ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
              <div
                className={`flex items-center gap-2 px-3 py-2 rounded-full ${
                  isDarkMode ? "bg-slate-700" : "bg-gray-200"
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                  {currentUser.username.charAt(0).toUpperCase()}
                </div>
                <span
                  className={`text-sm font-medium ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {currentUser.username}
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-2/3">
              {/* Current time display */}
              <div
                className={`mb-6 p-4 rounded-xl text-center ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                } shadow-md border-l-4 border-blue-500`}
              >
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-slate-300" : "text-gray-600"
                  }`}
                >
                  Local Time:{" "}
                  <span className="font-semibold">{currentLocalTime}</span>
                </p>
              </div>

              <div
                className={`flex justify-between items-center mb-6 p-4 rounded-xl ${
                  isDarkMode ? "bg-slate-800" : "bg-white"
                } shadow-md`}
              >
                <h2
                  className={`text-xl font-semibold ${
                    isDarkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {activeTab === "all" ? "Confessions" : "Popular Confessions"}
                </h2>
                <Button onClick={() => setShowForm(true)} variant="primary">
                  Share Your Confession
                </Button>
              </div>

              {/* Tab Navigation */}
              <div className="flex mb-6">
                <Button
                  onClick={() => setActiveTab("all")}
                  variant={activeTab === "all" ? "primary" : "ghost"}
                  className="rounded-r-none"
                >
                  All Confessions
                </Button>
                <Button
                  onClick={() => setActiveTab("popular")}
                  variant={activeTab === "popular" ? "primary" : "ghost"}
                  className="rounded-l-none"
                >
                  Popular Confessions
                </Button>
              </div>

              {/* Confession Feed */}
              <div className="space-y-6">
                <AnimatePresence>
                  {activeTab === "all" &&
                    (confessions.length > 0 ? (
                      confessions.map((confession) => (
                        <ConfessionCard
                          key={confession.id}
                          confession={confession}
                          onClick={() => setSelectedConfession(confession)}
                          isDarkMode={isDarkMode}
                        />
                      ))
                    ) : (
                      <EmptyState
                        message="No confessions yet. Be the first to share!"
                        buttonText="Share Your Confession"
                        onClick={() => setShowForm(true)}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                </AnimatePresence>

                <AnimatePresence>
                  {activeTab === "popular" &&
                    (popularConfessions.length > 0 ? (
                      popularConfessions.map((confession) => (
                        <ConfessionCard
                          key={confession.id}
                          confession={confession}
                          onClick={() => setSelectedConfession(confession)}
                          isPopular
                          isDarkMode={isDarkMode}
                        />
                      ))
                    ) : (
                      <EmptyState
                        message="No popular confessions yet."
                        isDarkMode={isDarkMode}
                      />
                    ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar */}
            {!isMobile && (
              <div className="lg:w-1/3">
                <div
                  className={`sticky top-24 p-6 rounded-xl shadow-lg ${
                    isDarkMode
                      ? "bg-slate-800 border border-slate-700"
                      : "bg-white border border-gray-200"
                  }`}
                >
                  <h2
                    className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Today's Confession Stats
                  </h2>
                  <div className="space-y-4">
                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-slate-750" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                          <MessageCircle size={20} className="text-blue-500" />
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            }`}
                          >
                            Total Confessions
                          </p>
                          <p
                            className={`text-xl font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {confessions.length}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-slate-750" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Heart size={20} className="text-purple-500" />
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            }`}
                          >
                            Total Likes
                          </p>
                          <p
                            className={`text-xl font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {confessions.reduce(
                              (sum, conf) => sum + conf.likes,
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-slate-750" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                          <MessageCircle
                            size={20}
                            className="text-emerald-500"
                          />
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            }`}
                          >
                            Total Comments
                          </p>
                          <p
                            className={`text-xl font-semibold ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {confessions.reduce(
                              (sum, conf) => sum + conf.comments.length,
                              0
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-700">
                    <h3
                      className={`text-lg font-semibold mb-4 ${
                        isDarkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      Most Active User
                    </h3>
                    <div
                      className={`p-3 rounded-lg ${
                        isDarkMode ? "bg-slate-750" : "bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
                          {currentUser.username.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                          >
                            {currentUser.username}
                          </p>
                          <p
                            className={`text-xs ${
                              isDarkMode ? "text-slate-400" : "text-gray-500"
                            }`}
                          >
                            {confessions.filter((c) =>
                              c.comments.some(
                                (com) => com.author === currentUser.username
                              )
                            ).length +
                              (confessions
                                .find((c) =>
                                  c.comments.some(
                                    (com) => com.author === currentUser.username
                                  )
                                )
                                ?.comments.filter(
                                  (com) => com.author === currentUser.username
                                ).length || 0)}{" "}
                            contributions
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Modals */}
        <AnimatePresence>
          {selectedConfession && (
            <ConfessionDetail
              confession={selectedConfession}
              onClose={() => setSelectedConfession(null)}
              onLike={() => handleLike(selectedConfession.id)}
              onCommentSubmit={(content) =>
                handleCommentSubmit(selectedConfession.id, content)
              }
              currentUser={currentUser}
              isDarkMode={isDarkMode}
            />
          )}
          {showForm && (
            <ConfessionForm
              onSubmit={handleSubmitConfession}
              onClose={() => setShowForm(false)}
              isDarkMode={isDarkMode}
            />
          )}
        </AnimatePresence>

        {/* Footer */}
        <footer
          className={`py-8 ${
            isDarkMode ? "bg-slate-800" : "bg-gray-100"
          } border-t ${isDarkMode ? "border-slate-700" : "border-gray-200"}`}
        >
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-bold">
                  <span className="text-blue-600">Confess</span>IT
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Share your thoughts anonymously
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button variant="ghost" size="sm">
                  Privacy Policy
                </Button>
                <Button variant="ghost" size="sm">
                  Terms of Service
                </Button>
                <Button variant="ghost" size="sm">
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>
                © {new Date().getFullYear()} ConfessIT. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeContext.Provider>
  );
}

export default ConfessionFeed;
// Zod Schema
export const Schema = {
  commentary: "",
  template: "nextjs-developer",
  title: "",
  description: "",
  additional_dependencies: ["framer-motion"],
  has_additional_dependencies: true,
  install_dependencies_command: "npm install framer-motion",
  port: 3000,
  file_path: "pages/index.tsx",
  code: "<see code above>",
};
