"use client";
import { useState } from "react";
import { FiEdit2, FiMessageSquare } from "react-icons/fi";

interface Comment {
  id: number;
  author: {
    name: string;
    role: string;
  };
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  author: {
    name: string;
    role: string;
  };
  content: string;
  likes: number;
  isLiked: boolean;
  comments: Comment[];
  showComments: boolean;
}

interface Profile {
  name: string;
  location: string;
  role: string;
  bio: string;
  image: string | null;
}

const initialProfile: Profile = {
  name: "John Doe",
  location: "San Francisco, CA",
  role: "Software Engineer",
  bio: "Software Engineer | React Developer | Tech Enthusiast",
  image: null,
};

const initialPosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Jane Smith",
      role: "Product Manager",
    },
    content:
      "Just launched our new product! Check it out and let me know what you think.",
    likes: 241,
    isLiked: false,
    comments: [],
    showComments: false,
  },
  {
    id: 2,
    author: {
      name: "Alex Chen",
      role: "UX Designer",
    },
    content:
      "Looking for recommendations on the best design tools for wireframing. What's everyone using these days?",
    likes: 80,
    isLiked: false,
    comments: [],
    showComments: false,
  },
  {
    id: 3,
    author: {
      name: "Emily Rodriguez",
      role: "Frontend Developer",
    },
    content:
      "Just completed my portfolio website redesign using React and Tailwind CSS. Would love to get your feedback!",
    likes: 422,
    isLiked: false,
    comments: [],
    showComments: false,
  },
];

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f3f4f6",
    color: "#1f2937",
    transition: "all 0.3s ease",
  },
  darkContainer: {
    backgroundColor: "#111827",
    color: "#f9fafb",
  },
  header: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    backdropFilter: "blur(8px)",
    borderBottom: "1px solid #e5e7eb",
    padding: "1rem",
  },
  darkHeader: {
    backgroundColor: "rgba(17, 24, 39, 0.8)",
    borderBottom: "1px solid #374151",
  },
  headerContent: {
    maxWidth: "896px",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
  },
  profileButton: {
    position: "relative" as const,
    cursor: "pointer",
    border: "none",
    background: "none",
    padding: 0,
  },
  avatar: {
    width: "2.5rem",
    height: "2.5rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "1rem",
    fontWeight: "bold",
    overflow: "hidden" as const,
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  editIcon: {
    position: "absolute" as const,
    bottom: "-0.25rem",
    right: "-0.25rem",
    backgroundColor: "#3b82f6",
    color: "white",
    width: "1.25rem",
    height: "1.25rem",
    borderRadius: "9999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
  },
  main: {
    maxWidth: "896px",
    margin: "0 auto",
    padding: "5rem 1rem 2rem",
  },
  createPost: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1rem",
    marginBottom: "2rem",
    marginTop: "2rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  darkCreatePost: {
    backgroundColor: "#1f2937",
  },
  postTitle: {
    fontSize: "1.125rem",
    fontWeight: "600",
    marginBottom: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    resize: "none" as const,
    minHeight: "6rem",
    marginBottom: "1rem",
  },
  darkTextarea: {
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "#f9fafb",
  },
  postButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginLeft: "auto",
  },
  postList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1.5rem",
  },
  post: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "1.5rem",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  },
  darkPost: {
    backgroundColor: "#1f2937",
  },
  postHeader: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    marginBottom: "1rem",
  },
  postAvatar: {
    width: "3rem",
    height: "3rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
  },
  postAuthor: {
    flex: 1,
  },
  postAuthorName: {
    fontWeight: "600",
    marginBottom: "0.25rem",
  },
  postAuthorRole: {
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  postContent: {
    marginBottom: "1rem",
    color: "#374151",
  },
  darkPostContent: {
    color: "#e5e7eb",
  },
  postActions: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    color: "#6b7280",
  },
  actionButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "color 0.2s",
    border: "none",
    background: "none",
    padding: 0,
    color: "#6b7280",
  },
  likedButton: {
    color: "#ef4444",
  },
  themeToggle: {
    padding: "0.5rem",
    borderRadius: "9999px",
    cursor: "pointer",
    transition: "background-color 0.2s",
    border: "none",
    background: "none",
    position: "absolute" as const,
    right: "1rem",
    top: "1rem",
    zIndex: 100,
  },
  modal: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: "0.75rem",
    padding: "2rem",
    width: "100%",
    maxWidth: "32rem",
    position: "relative" as const,
  },
  darkModalContent: {
    backgroundColor: "#1f2937",
    color: "#f9fafb",
  },
  modalClose: {
    position: "absolute" as const,
    top: "1rem",
    right: "1rem",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#6b7280",
  },
  modalTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "500",
  },
  input: {
    width: "100%",
    padding: "0.75rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  darkInput: {
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "#f9fafb",
  },
  saveButton: {
    padding: "0.75rem 1.5rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
    marginTop: "1rem",
  },
  profileImageSection: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    marginBottom: "2rem",
  },
  largeAvatar: {
    width: "8rem",
    height: "8rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "1rem",
    overflow: "hidden" as const,
    position: "relative" as const,
  },
  imageUploadButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  imageInput: {
    display: "none",
  },
  commentSection: {
    marginTop: "1rem",
    paddingTop: "1rem",
    borderTop: "1px solid #e5e7eb",
  },
  commentInput: {
    display: "flex",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
  commentTextarea: {
    flex: 1,
    padding: "0.5rem",
    borderRadius: "0.5rem",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
    resize: "none" as const,
    minHeight: "2.5rem",
    fontSize: "0.875rem",
  },
  darkCommentTextarea: {
    backgroundColor: "#374151",
    borderColor: "#4b5563",
    color: "#f9fafb",
  },
  commentButton: {
    padding: "0.5rem 1rem",
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "0.5rem",
    border: "none",
    cursor: "pointer",
    fontSize: "0.875rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  commentsList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
  },
  comment: {
    display: "flex",
    gap: "0.75rem",
  },
  commentAvatar: {
    width: "2rem",
    height: "2rem",
    borderRadius: "9999px",
    background: "linear-gradient(to right, #3b82f6, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontSize: "0.75rem",
    fontWeight: "bold",
    flexShrink: 0,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    marginBottom: "0.25rem",
  },
  commentAuthor: {
    fontWeight: "600",
    fontSize: "0.875rem",
  },
  commentTimestamp: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  commentText: {
    fontSize: "0.875rem",
    color: "#374151",
  },
  darkCommentText: {
    color: "#e5e7eb",
  },
  footer: {
    backgroundColor: "white",
    borderTop: "1px solid #e5e7eb",
    padding: "1.5rem",
    marginTop: "2rem",
  },
  darkFooter: {
    backgroundColor: "#1f2937",
    borderTop: "1px solid #374151",
  },
  footerContent: {
    maxWidth: "896px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.875rem",
    color: "#6b7280",
  },
  footerLinks: {
    display: "flex",
    gap: "1.5rem",
  },
  footerLink: {
    color: "#6b7280",
    textDecoration: "none",
    transition: "color 0.2s",
    cursor: "pointer",
  },
};

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [newComment, setNewComment] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post: Post = {
      id: posts.length + 1,
      author: {
        name: profile.name,
        role: profile.role,
      },
      content: newPost,
      likes: 0,
      isLiked: false,
      comments: [],
      showComments: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowProfileModal(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("");
  };

  const handleCommentSubmit = (postId: number) => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      author: {
        name: profile.name,
        role: profile.role,
      },
      content: newComment,
      timestamp: new Date().toLocaleString(),
    };

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment],
          };
        }
        return post;
      })
    );

    setNewComment("");
  };

  const toggleComments = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            showComments: !post.showComments,
          };
        }
        return post;
      })
    );
  };

  return (
    <div
      style={{ ...styles.container, ...(darkMode ? styles.darkContainer : {}) }}
    >
      {/* Header */}
      <header
        style={{ ...styles.header, ...(darkMode ? styles.darkHeader : {}) }}
      >
        <div style={styles.headerContent}>
          <h1 style={styles.title}>SimpleLinkedin</h1>
          <div style={styles.headerRight}>
            <button
              onClick={() => setShowProfileModal(true)}
              style={styles.profileButton}
            >
              <div style={styles.avatar}>
                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name}
                    style={styles.avatarImage}
                  />
                ) : (
                  getInitials(profile.name)
                )}
              </div>
              <div style={styles.editIcon}>
                <FiEdit2 size={12} />
              </div>
            </button>
          </div>
        </div>
        <button onClick={toggleDarkMode} style={styles.themeToggle}>
          {darkMode ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Profile Modal */}
      {showProfileModal && (
        <div style={styles.modal}>
          <div
            style={{
              ...styles.modalContent,
              ...(darkMode ? styles.darkModalContent : {}),
            }}
          >
            <button
              onClick={() => setShowProfileModal(false)}
              style={styles.modalClose}
            >
              ×
            </button>
            <h2 style={styles.modalTitle}>Edit Profile</h2>
            <form onSubmit={handleProfileSubmit}>
              <div style={styles.profileImageSection}>
                <div style={styles.largeAvatar}>
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name}
                      style={styles.avatarImage}
                    />
                  ) : (
                    getInitials(profile.name)
                  )}
                </div>
                <label style={styles.imageUploadButton}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={styles.imageInput}
                  />
                  Change Photo
                </label>
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) =>
                    setProfile({ ...profile, name: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(darkMode ? styles.darkInput : {}),
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Location</label>
                <input
                  type="text"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(darkMode ? styles.darkInput : {}),
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Role</label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) =>
                    setProfile({ ...profile, role: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(darkMode ? styles.darkInput : {}),
                  }}
                />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label}>Bio</label>
                <input
                  type="text"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  style={{
                    ...styles.input,
                    ...(darkMode ? styles.darkInput : {}),
                  }}
                />
              </div>
              <button type="submit" style={styles.saveButton}>
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main style={styles.main}>
        {/* Create Post */}
        <div
          style={{
            ...styles.createPost,
            ...(darkMode ? styles.darkCreatePost : {}),
          }}
        >
          <h3 style={styles.postTitle}>Share Your Thoughts</h3>
          <form onSubmit={handlePostSubmit}>
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="What's on your mind?"
              style={{
                ...styles.textarea,
                ...(darkMode ? styles.darkTextarea : {}),
              }}
              rows={3}
            />
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button type="submit" style={styles.postButton}>
                Post
              </button>
            </div>
          </form>
        </div>

        {/* Posts Feed */}
        <div style={styles.postList}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{ ...styles.post, ...(darkMode ? styles.darkPost : {}) }}
            >
              <div style={styles.postHeader}>
                <div style={styles.postAvatar}>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div style={styles.postAuthor}>
                  <h3 style={styles.postAuthorName}>{post.author.name}</h3>
                  <p style={styles.postAuthorRole}>{post.author.role}</p>
                </div>
              </div>
              <p
                style={{
                  ...styles.postContent,
                  ...(darkMode ? styles.darkPostContent : {}),
                }}
              >
                {post.content}
              </p>
              <div style={styles.postActions}>
                <button
                  onClick={() => handleLike(post.id)}
                  style={{
                    ...styles.actionButton,
                    ...(post.isLiked ? styles.likedButton : {}),
                  }}
                >
                  {post.isLiked ? "❤️" : "🤍"} {post.likes}
                </button>
                <button
                  onClick={() => toggleComments(post.id)}
                  style={styles.actionButton}
                >
                  <FiMessageSquare size={16} /> Comment{" "}
                  {post.comments.length > 0 && `(${post.comments.length})`}
                </button>
              </div>
              {post.showComments && (
                <div style={styles.commentSection}>
                  <div style={styles.commentInput}>
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      style={{
                        ...styles.commentTextarea,
                        ...(darkMode ? styles.darkCommentTextarea : {}),
                      }}
                      rows={1}
                    />
                    <button
                      onClick={() => handleCommentSubmit(post.id)}
                      style={styles.commentButton}
                    >
                      Comment
                    </button>
                  </div>
                  <div style={styles.commentsList}>
                    {post.comments.map((comment) => (
                      <div key={comment.id} style={styles.comment}>
                        <div style={styles.commentAvatar}>
                          {comment.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div style={styles.commentContent}>
                          <div style={styles.commentHeader}>
                            <span style={styles.commentAuthor}>
                              {comment.author.name}
                            </span>
                            <span style={styles.commentTimestamp}>
                              {comment.timestamp}
                            </span>
                          </div>
                          <p
                            style={{
                              ...styles.commentText,
                              ...(darkMode ? styles.darkCommentText : {}),
                            }}
                          >
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{ ...styles.footer, ...(darkMode ? styles.darkFooter : {}) }}
      >
        <div style={styles.footerContent}>
          <div>
            © {new Date().getFullYear()} SimpleLinked. All rights reserved.
          </div>
          <div style={styles.footerLinks}>
            <a href="#" style={styles.footerLink}>
              Privacy Policy
            </a>
            <a href="#" style={styles.footerLink}>
              Terms of Service
            </a>
            <a href="#" style={styles.footerLink}>
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
