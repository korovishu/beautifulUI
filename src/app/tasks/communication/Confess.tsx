"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Shield,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Instagram,
  Facebook,
  Twitter,
  Menu,
} from "lucide-react";

// Define interfaces for data types
interface Comment {
  author: string;
  text: string;
  date: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  likes: number;
  comments: Comment[];
  date: string;
}

// Initial dummy data
const initialPosts: Post[] = [
  {
    id: 1,
    title: "My Secret Crush",
    content:
      "I have had a crush on someone from afar for months now. I wish I could tell them how I feel but I'm scared of rejection. Has anyone gone through this before?",
    likes: 42,
    comments: [
      {
        author: "Anonymous",
        text: "I totally get it! Sometimes it's best to just confess and clear the air.",
        date: "2025-04-19",
      },
      {
        author: "Anonymous",
        text: "Take a chance, the worst they can say is no!",
        date: "2025-04-18",
      },
    ],
    date: "2025-04-20",
  },
  {
    id: 2,
    title: "A Mistake I'm Ashamed Of",
    content:
      "I made a huge mistake at work that cost the company money. I'm too afraid to tell my boss and I don't know how to fix it. Any advice?",
    likes: 28,
    comments: [
      {
        author: "Anonymous",
        text: "Everyone makes mistakes! Own up to it and offer a solution.",
        date: "2025-04-19",
      },
    ],
    date: "2025-04-19",
  },
];

export default function ConfessionPage() {
  // States
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [showConfessionForm, setShowConfessionForm] = useState(false);
  const [newConfession, setNewConfession] = useState({
    title: "",
    content: "",
  });
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [newComment, setNewComment] = useState({ author: "", text: "" });
  const [likedPosts, setLikedPosts] = useState<{ [key: number]: boolean }>({});
  const [showSharePopup, setShowSharePopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const latestPostRef = useRef<HTMLDivElement>(null);

  // Scroll to top on initial load
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsClient(true);
  }, []);

  // Handlers
  const handleNewConfession = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newConfession.title.trim() && newConfession.content.trim()) {
      const newPost: Post = {
        id: Date.now(),
        title: newConfession.title,
        content: newConfession.content,
        likes: 0,
        comments: [],
        date: new Date().toISOString().split("T")[0],
      };
      setPosts([newPost, ...posts]);
      setNewConfession({ title: "", content: "" });
      setShowConfessionForm(false);

      // Wait for state update and DOM render
      setTimeout(() => {
        if (latestPostRef.current) {
          latestPostRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    }
  };

  const handleCommentSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    postId: number
  ) => {
    e.preventDefault();
    if (newComment.text.trim()) {
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          const newCommentObj: Comment = {
            author: newComment.author.trim() || "Anonymous",
            text: newComment.text,
            date: new Date().toISOString().split("T")[0],
          };
          return {
            ...post,
            comments: [...post.comments, newCommentObj],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
      setNewComment({ author: "", text: "" });
      if (selectedPost && selectedPost.id === postId) {
        const updatedPost = updatedPosts.find((post) => post.id === postId);
        if (updatedPost) {
          setSelectedPost(updatedPost);
        }
      }
    }
  };

  const handleLike = (postId: number) => {
    if (likedPosts[postId]) return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return { ...post, likes: post.likes + 1 };
      }
      return post;
    });

    setPosts(updatedPosts);
    setLikedPosts((prev) => ({ ...prev, [postId]: true }));

    if (selectedPost && selectedPost.id === postId) {
      const updatedPost = updatedPosts.find((post) => post.id === postId);
      if (updatedPost) {
        setSelectedPost(updatedPost);
      }
    }
  };

  const openPostDetails = (post: Post) => {
    setSelectedPost(post);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closePostDetails = () => {
    setSelectedPost(null);
  };

  const openSharePopup = () => {
    setShowSharePopup(true);
  };

  const closeSharePopup = () => {
    setShowSharePopup(false);
  };

  const openContactPopup = () => {
    setShowContactPopup(true);
  };

  const closeContactPopup = () => {
    setShowContactPopup(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const closeThankYou = () => {
    setShowThankYou(false);
  };

  // Card variants for staggered animations
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  // Return null if not client-side to prevent hydration issues
  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-800 dark:text-slate-200 font-sans">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <MessageCircle className="w-6 h-6 text-rose-400" />
            <h1 className="text-xl font-bold">Confessit</h1>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden md:flex items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfessionForm(true)}
                className="bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full shadow-md transition-colors font-medium flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> Confess
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContactPopup}
                className="bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full shadow-md transition-colors font-medium"
              >
                Contact Us
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
            >
              <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowConfessionForm(true);
                    setShowMenu(false);
                  }}
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-lg transition-colors font-medium flex items-center gap-2 justify-center"
                >
                  <Shield className="w-4 h-4" /> Confess
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    openContactPopup();
                    setShowMenu(false);
                  }}
                  className="w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay"></div>

        <div className="max-w-5xl mx-auto px-4 py-16 sm:py-24 md:py-32 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-400 via-pink-300 to-purple-400 leading-tight"
            >
              Share Your Confessions Anonymously
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-lg sm:text-xl mb-8 text-slate-300"
            >
              A safe space to express your deepest thoughts without fear of
              judgment
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfessionForm(true)}
                className="bg-rose-400 hover:bg-rose-500 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 font-medium text-lg flex items-center gap-2 justify-center"
              >
                <Shield className="w-5 h-5" /> Confess Anonymously
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openSharePopup}
                className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-200 font-medium text-lg"
              >
                Share Your Story
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-4"
            >
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-bold text-rose-400">
                  {posts.length}+
                </div>
                <div className="text-xs sm:text-sm text-slate-400">
                  Confessions
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-bold text-rose-400">
                  {posts.reduce((acc, post) => acc + post.comments.length, 0)}+
                </div>
                <div className="text-xs sm:text-sm text-slate-400">
                  Comments
                </div>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-sm p-4 rounded-lg border border-slate-700/50">
                <div className="text-2xl sm:text-3xl font-bold text-rose-400">
                  {posts.reduce((acc, post) => acc + post.likes, 0)}+
                </div>
                <div className="text-xs sm:text-sm text-slate-400">Likes</div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-30"></div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:py-12 relative z-0">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Confession Feed */}
          <div className="md:col-span-2 space-y-6 sm:space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">
                Recent Confessions
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowConfessionForm(true)}
                className="bg-rose-400 hover:bg-rose-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2"
              >
                <Shield className="w-4 h-4" /> New Confession
              </motion.button>
            </div>

            <div className="space-y-6">
              {posts.length === 0 ? (
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 text-center">
                  <p className="text-slate-500 dark:text-slate-400">
                    No confessions yet. Be the first to share!
                  </p>
                </div>
              ) : (
                posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    ref={index === 0 ? latestPostRef : null}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-300"
                  >
                    <div className="p-5 sm:p-6 space-y-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100">
                          {post.title}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {post.date}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 line-clamp-3 text-sm sm:text-base">
                        {post.content}
                      </p>

                      <div className="flex flex-wrap gap-3 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleLike(post.id)}
                          disabled={likedPosts[post.id]}
                          className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-full transition-all ${
                            likedPosts[post.id]
                              ? "bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400"
                              : "bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400"
                          }`}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              likedPosts[post.id] ? "fill-current" : ""
                            }`}
                          />{" "}
                          {post.likes} Likes
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => openPostDetails(post)}
                          className="flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-slate-500 dark:text-slate-400"
                        >
                          <MessageCircle className="w-4 h-4" />{" "}
                          {post.comments.length} Comments
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>

          {/* Right Column - Featured/Popular Confessions */}
          <div className="space-y-6 sm:space-y-8">
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Popular Confessions
              </h3>
              <div className="space-y-4">
                {[...posts]
                  .sort(
                    (a, b) =>
                      b.likes +
                      b.comments.length -
                      (a.likes + a.comments.length)
                  )
                  .slice(0, 3)
                  .map((post, index) => (
                    <motion.div
                      key={post.id}
                      custom={index}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      onClick={() => openPostDetails(post)}
                      className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-sm sm:text-base text-slate-800 dark:text-slate-100">
                          {post.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {post.date}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                        {post.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <Heart className="w-3 h-3" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                          <MessageCircle className="w-3 h-3" />{" "}
                          {post.comments.length}
                        </span>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-gradient-to-br from-rose-400 to-pink-400 rounded-xl shadow-sm p-5 sm:p-6 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 mix-blend-overlay"></div>

              <h3 className="text-lg sm:text-xl font-bold mb-3 relative z-10">
                Need Someone to Talk To?
              </h3>
              <p className="mb-4 text-sm sm:text-base opacity-90 relative z-10">
                Our support team is here for you 24/7
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={openContactPopup}
                className="bg-white text-rose-400 px-4 py-2 rounded-full font-medium transition-colors hover:bg-slate-100 relative z-10"
              >
                Contact Support
              </motion.button>

              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            </motion.div>

            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 sm:p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="text-lg sm:text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
                Statistics
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-xl sm:text-2xl font-bold text-rose-400">
                    {posts.length}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Total Confessions
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-xl sm:text-2xl font-bold text-rose-400">
                    {posts.reduce((acc, post) => acc + post.comments.length, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Total Comments
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-xl sm:text-2xl font-bold text-rose-400">
                    {posts.reduce((acc, post) => acc + post.likes, 0)}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Total Likes
                  </div>
                </div>
                <div className="bg-slate-50 dark:bg-slate-700 p-3 sm:p-4 rounded-lg border border-slate-200 dark:border-slate-600">
                  <div className="text-xl sm:text-2xl font-bold text-rose-400">
                    {
                      Array.from(
                        new Set(
                          posts.flatMap((post) =>
                            post.comments.map((comment) => comment.author)
                          )
                        )
                      ).length
                    }
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                    Active Users
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Post Detail Modal */}
      <AnimatePresence>
        {selectedPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closePostDetails}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8 space-y-6 overflow-y-auto">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                      {selectedPost.title}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                      {selectedPost.date}
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={closePostDetails}
                    className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
                  {selectedPost.content}
                </p>

                <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleLike(selectedPost.id)}
                    disabled={likedPosts[selectedPost.id]}
                    className={`flex items-center gap-2 text-xs sm:text-sm px-3 py-2 rounded-full transition-all ${
                      likedPosts[selectedPost.id]
                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-500 dark:text-rose-400"
                        : "bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-slate-500 dark:text-slate-400 hover:text-rose-500 dark:hover:text-rose-400"
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedPosts[selectedPost.id] ? "fill-current" : ""
                      }`}
                    />{" "}
                    {selectedPost.likes} Likes
                  </motion.button>
                </div>

                {/* Comments Section */}
                <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-base sm:text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Comments ({selectedPost.comments.length})
                  </h3>

                  {selectedPost.comments.length > 0 ? (
                    <div className="space-y-4">
                      {selectedPost.comments.map((comment, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-slate-50 dark:bg-slate-700 rounded-lg p-4 border border-slate-200 dark:border-slate-600"
                        >
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-medium text-xs sm:text-sm text-slate-700 dark:text-slate-200">
                              {comment.author}
                            </span>
                            <span className="text-xs text-slate-500 dark:text-slate-400">
                              {comment.date}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                            {comment.text}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                      No comments yet. Be the first to comment!
                    </p>
                  )}

                  <form
                    onSubmit={(e) => handleCommentSubmit(e, selectedPost.id)}
                    className="space-y-3"
                  >
                    <input
                      type="text"
                      value={newComment.author}
                      onChange={(e) =>
                        setNewComment({ ...newComment, author: e.target.value })
                      }
                      placeholder="Your name (optional)"
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all text-xs sm:text-sm"
                    />
                    <textarea
                      value={newComment.text}
                      onChange={(e) =>
                        setNewComment({ ...newComment, text: e.target.value })
                      }
                      placeholder="Write a comment..."
                      required
                      className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all text-xs sm:text-sm"
                      rows={3}
                    />
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full sm:w-auto bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full font-medium transition-colors text-xs sm:text-sm"
                    >
                      Post Comment
                    </motion.button>
                  </form>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confession Form Modal */}
      <AnimatePresence>
        {showConfessionForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowConfessionForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Share Your Confession
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowConfessionForm(false)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <form onSubmit={handleNewConfession} className="space-y-4">
                <div className="space-y-2">
                  <input
                    type="text"
                    value={newConfession.title}
                    onChange={(e) =>
                      setNewConfession({
                        ...newConfession,
                        title: e.target.value,
                      })
                    }
                    placeholder="Title"
                    required
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <textarea
                    value={newConfession.content}
                    onChange={(e) =>
                      setNewConfession({
                        ...newConfession,
                        content: e.target.value,
                      })
                    }
                    placeholder="Your confession..."
                    required
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    rows={6}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-rose-400 hover:bg-rose-500 text-white px-4 py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
                >
                  Submit Confession
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Popup */}
      <AnimatePresence>
        {showSharePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeSharePopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Share Your Story
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeSharePopup}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  Share your story with the world. Your confession will be
                  posted anonymously unless you choose to share your identity.
                </p>

                <div className="bg-slate-100 dark:bg-slate-700 p-4 rounded-lg text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <p>
                    Remember: All confessions are posted anonymously by default
                    for your privacy.
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      navigator.clipboard.writeText(
                        "Check out this confession platform: [your website URL]"
                      );
                      alert("Link copied to clipboard!");
                    }}
                    className="flex items-center gap-2 justify-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" /> Share on Social Media
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      const shareUrl = "https://yourdomain.com";
                      if (navigator.share) {
                        navigator
                          .share({
                            title: "Anonymous Confessions",
                            text: "Share your deepest thoughts anonymously",
                            url: shareUrl,
                          })
                          .catch(console.error);
                      } else {
                        navigator.clipboard.writeText(shareUrl);
                        alert("Link copied to clipboard!");
                      }
                    }}
                    className="flex items-center gap-2 justify-center bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-full transition-colors"
                  >
                    <Mail className="w-4 h-4" /> Share via Email
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Us Popup */}
      <AnimatePresence>
        {showContactPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeContactPopup}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Contact Us
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeContactPopup}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  We&apos;d love to hear from you! Fill out the form below or
                  use our contact information.
                </p>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="Enter your name"
                      className="w-full p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="Enter your email"
                      className="w-full p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="Type your message here..."
                      className="w-full p-2 sm:p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-rose-400 focus:border-transparent transition-all"
                      rows={4}
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 sm:py-3 rounded-full font-medium transition-colors text-sm sm:text-base"
                  >
                    Send Message
                  </motion.button>
                </form>

                <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
                  <h3 className="text-base sm:text-lg font-semibold mb-3 text-slate-800 dark:text-slate-100">
                    Other Ways to Reach Us
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <Mail className="w-4 h-4" />
                      <span>support@confessit.com</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <Phone className="w-4 h-4" />
                      <span>+1 (800) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="w-4 h-4" />
                      <span>123 Confession Street, Privacy City, PC 12345</span>
                    </div>
                    <div className="flex items-center gap-3 pt-2">
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:text-rose-400 dark:hover:text-rose-400 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:text-rose-400 dark:hover:text-rose-400 transition-colors"
                      >
                        <Facebook className="w-5 h-5" />
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        href="#"
                        className="text-slate-600 dark:text-slate-400 hover:text-rose-400 dark:hover:text-rose-400 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Thank You Popup */}
      <AnimatePresence>
        {showThankYou && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={closeThankYou}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", bounce: 0.1 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full max-w-md p-6 sm:p-8 border border-slate-200 dark:border-slate-700"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                  className="bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 rounded-full p-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 sm:h-10 sm:w-10"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-100">
                  Thank You!
                </h2>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base">
                  We&apos;ve received your message and will get back to you
                  soon.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeThankYou}
                  className="mt-4 bg-rose-400 hover:bg-rose-500 text-white px-4 py-2 rounded-full font-medium transition-colors text-sm sm:text-base"
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-6 sm:py-8 mt-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-rose-400" />
                <h3 className="text-base sm:text-lg font-bold">Confessit</h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                A safe space for anonymous confessions
              </p>
            </div>
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold">Links</h3>
              <ul className="space-y-2">
                <li>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={() => setShowConfessionForm(true)}
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" /> Confess
                  </motion.button>
                </li>
                <li>
                  <motion.button
                    whileHover={{ x: 5 }}
                    onClick={openContactPopup}
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors flex items-center gap-1"
                  >
                    <Mail className="w-3 h-3" /> Contact
                  </motion.button>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-xs sm:text-sm text-slate-400 hover:text-rose-400 transition-colors"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold">Connect</h3>
              <div className="flex items-center gap-3">
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  href="#"
                  className="text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 pt-6 border-t border-slate-700 text-center text-xs sm:text-sm text-slate-500">
            <p>© 2025 Confessit. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
