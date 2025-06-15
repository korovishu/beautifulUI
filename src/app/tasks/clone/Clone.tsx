"use client";
import { useState, useEffect, FC, FormEvent, ChangeEvent, JSX } from 'react';

// --- TYPE DEFINITIONS ---
// These types define the data structure for our application
type User = {
  id: number;
  name: string;
  location: string;
  bio: string;
  about: string;
  avatar: string;
  connections: number[];
  coverPhoto: string;
};

type Comment = {
  id: number;
  userId: number;
  text: string;
};

type Post = {
  id: number;
  userId: number;
  content: string;
  likes: number[]; // Array of user IDs who liked the post
  comments: Comment[];
  media?: {
    type: 'image' | 'video';
    url: string;
  };
};

type Page = 'Home' | 'Profile' | 'Network';

// --- SVG ICONS ---
// Reusable SVG icons for a consistent look and feel
const HomeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
);
const NetworkIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z" /></svg>
);
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
);
const LikeIcon = ({ filled }: { filled: boolean }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={`w-5 h-5 transition-transform duration-200 ease-in-out ${filled ? 'text-red-500 scale-110' : 'text-gray-500'}`}>
    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
  </svg>
);
const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-500"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
);
const EditIcon = ({className = "w-5 h-5"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>
);
const PhotoIcon = ({className = "w-6 h-6 text-blue-500"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
);
const VideoIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>
);


// --- MOCK DATA ---
const initialUsers: User[] = [
  { id: 1, name: 'Alex Doe', location: 'San Francisco, CA', bio: 'Software Engineer at TechCorp. Passionate about AI and building scalable systems.', about: 'Experienced software engineer with a focus on AI and machine learning. Currently working on building scalable systems at TechCorp. Previously worked at Google and Microsoft.', avatar: 'https://placehold.co/100x100/EFEFEF/333?text=AD', connections: [2, 3], coverPhoto: 'https://t3.ftcdn.net/jpg/07/05/22/98/360_F_705229898_6MV4F9FPWLFzz1pWVmr3BNnls9s8b1x4.jpg' },
  { id: 2, name: 'Jane Smith', location: 'New York, NY', bio: 'Product Manager at Innovate Inc. Focused on user-centric design.', about: 'Product Manager with 5+ years of experience in tech. Passionate about creating user-centric products that solve real problems. Previously led product teams at Amazon and Facebook.', avatar: 'https://placehold.co/100x100/D4EDDA/333?text=JS', connections: [1], coverPhoto: 'https://t3.ftcdn.net/jpg/07/05/22/98/360_F_705229898_6MV4F9FPWLFzz1pWVmr3BNnls9s8b1x4.jpg' },
  { id: 3, name: 'Sam Wilson', location: 'Chicago, IL', bio: 'UX/UI Designer at Creative Solutions.', about: 'Creative UX/UI designer with a background in graphic design. Specializes in creating intuitive and beautiful user interfaces. Worked with various startups and established companies.', avatar: 'https://placehold.co/100x100/C5DFFF/333?text=SW', connections: [1], coverPhoto: 'https://t3.ftcdn.net/jpg/07/05/22/98/360_F_705229898_6MV4F9FPWLFzz1pWVmr3BNnls9s8b1x4.jpg' },
  { id: 4, name: 'Maria Garcia', location: 'Austin, TX', bio: 'Data Scientist at DataDriven Co.', about: 'Data scientist with expertise in machine learning and statistical analysis. Currently working on predictive analytics and recommendation systems. PhD in Computer Science from MIT.', avatar: 'https://placehold.co/100x100/FFF3C5/333?text=MG', connections: [], coverPhoto: 'https://t3.ftcdn.net/jpg/07/05/22/98/360_F_705229898_6MV4F9FPWLFzz1pWVmr3BNnls9s8b1x4.jpg' },
];

const initialPosts: Post[] = [
  { id: 1, userId: 1, content: 'Excited to share that our team just launched a new feature! It was a huge effort, and I\'m so proud of what we accomplished. #Tech #AI', likes: [2, 3], comments: [{ id: 1, userId: 2, text: 'Congratulations, Alex!' }] },
  { id: 2, userId: 2, content: 'Just published a blog post on the future of product management. Would love to hear your thoughts! #Product #Innovation', likes: [1], comments: [] },
  { id: 3, userId: 3, content: 'Here are steps for better UX design process. Hope this helps fellow designers out there! #UX #Design', likes: [1, 2], comments: [{ id: 2, userId: 1, text: 'Great tips, Sam!' }], media: { type: 'image', url: 'https://media.geeksforgeeks.org/wp-content/uploads/20240515122624/UX-design-process-(infograph)-copy.webp' } },
  { id: 4, userId: 4, content: 'Deep diving into machine learning models this week. The possibilities are endless!', likes: [], comments: [] },
];


// --- HELPER FUNCTION ---
const findUserById = (id: number, users: User[]): User | undefined => users.find(u => u.id === id);


// --- COMPONENTS ---

// Header Component
const Header: FC<{
  user: User;
  onNavigate: (page: Page) => void;
  activePage: Page;
}> = ({ user, onNavigate, activePage }) => {
  const NavLink: FC<{ page: Page; icon: JSX.Element; text: string }> = ({ page, icon, text }) => (
      <button onClick={() => onNavigate(page)} className={`flex flex-col items-center justify-center text-xs w-20 h-full transition-colors ${activePage === page ? 'text-black border-b-2 border-black' : 'text-gray-600 hover:text-black'}`}>
          {icon}
          <span className="hidden sm:block">{text}</span>
      </button>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-700 cursor-pointer" onClick={() => onNavigate('Home')}>SimpleLinkedin</h1>
          </div>
          <nav className="flex items-center h-full">
              <NavLink page="Home" icon={<HomeIcon />} text="Home" />
              <NavLink page="Network" icon={<NetworkIcon />} text="My Network" />
              <NavLink page="Profile" icon={<UserIcon />} text="Me" />
          </nav>
        </div>
      </div>
    </header>
  );
};

// Post Creation Component
const CreatePost: FC<{
  currentUser: User;
  onAddPost: (content: string, file: File | null) => void;
}> = ({ currentUser, onAddPost }) => {
  const [content, setContent] = useState('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() || mediaFile) {
      onAddPost(content.trim(), mediaFile);
      setContent('');
      setMediaFile(null);
      setPreviewUrl(null);
      if(document.getElementById('media-upload')) {
        (document.getElementById('media-upload') as HTMLInputElement).value = "";
      }
    }
  };

  const removeMedia = () => {
    setMediaFile(null);
    setPreviewUrl(null);
    if(document.getElementById('media-upload')) {
        (document.getElementById('media-upload') as HTMLInputElement).value = "";
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-6">
      <div className="flex items-start space-x-3">
        <img src={currentUser.avatar} alt="Current User Avatar" className="h-12 w-12 rounded-full object-cover" />
        <form onSubmit={handleSubmit} className="w-full">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            rows={2}
            placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {previewUrl && (
            <div className="mt-3 relative">
              <button onClick={removeMedia} className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 leading-none z-10 hover:bg-opacity-80">&times;</button>
              {mediaFile?.type.startsWith('image') ? (
                <img src={previewUrl} alt="Preview" className="rounded-lg max-h-80 w-auto" />
              ) : (
                <video src={previewUrl} controls className="rounded-lg max-h-80 w-auto" />
              )}
            </div>
          )}
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-4">
                <input id="media-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
                <label htmlFor="media-upload" className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-blue-600 transition-colors">
                    <PhotoIcon /> <span className='font-medium'>Photo</span>
                </label>
                 <label htmlFor="media-upload" className="flex items-center space-x-2 cursor-pointer text-gray-500 hover:text-green-600 transition-colors">
                    <VideoIcon /> <span className='font-medium'>Video</span>
                </label>
            </div>
            <button type="submit" disabled={!content.trim() && !mediaFile} className="bg-blue-600 text-white font-bold py-2 px-5 rounded-full hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};


// Post Card Component
const PostCard: FC<{
  post: Post;
  users: User[];
  currentUserId: number;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onEditPost: (updatedPost: Post) => void;
  onDeletePost: (postId: number) => void;
  onViewProfile: (userId: number) => void;
}> = ({ post, users, currentUserId, onLike, onAddComment, onEditPost, onDeletePost, onViewProfile }) => {
  const author = findUserById(post.userId, users);
  const currentUser = findUserById(currentUserId, users);
  const [commentText, setCommentText] = useState('');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const hasLiked = post.likes.includes(currentUserId);
  const isAuthor = post.userId === currentUserId;

  const handleCommentSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(post.id, commentText.trim());
      setCommentText('');
      setShowCommentInput(false);
    }
  };

  if (!author || !currentUser) return null;

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
            <img 
                src={author.avatar} 
                alt={author.name} 
                className="h-12 w-12 rounded-full mr-3 object-cover cursor-pointer"
                onClick={() => onViewProfile(author.id)} 
            />
            <div>
                <p 
                    className="font-semibold text-gray-800 text-sm cursor-pointer hover:underline"
                    onClick={() => onViewProfile(author.id)}
                >
                    {author.name}
                </p>
                <p className="text-xs text-gray-500">{author.bio}</p>
            </div>
        </div>
        {isAuthor && (
          <div className="flex items-center gap-2">
            <button onClick={() => setEditModalOpen(true)} className="text-gray-500 hover:text-blue-600 p-2 rounded-full transition-colors">
              <EditIcon />
            </button>
            <button 
              onClick={() => onDeletePost(post.id)} 
              className="text-gray-500 hover:text-red-600 p-2 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {post.content && <p className="text-gray-800 mb-4 text-sm whitespace-pre-wrap">{post.content}</p>}

      {post.media && (
        <div className="mb-2 -mx-4">
          {post.media.type === 'image' ? (
            <img src={post.media.url} alt="Post content" className="w-full max-h-[500px] object-cover" />
          ) : (
            <video src={post.media.url} controls className="w-full rounded-lg" />
          )}
        </div>
      )}

      <div className="flex justify-between items-center text-xs text-gray-500 py-1">
        <span>{post.likes.length > 0 ? `${post.likes.length} Likes` : ''}</span>
        <span>{post.comments.length > 0 ? `${post.comments.length} Comments` : ''}</span>
      </div>

      <div className="flex justify-around items-center text-gray-600 border-t border-gray-200 mt-1 pt-1">
        <button onClick={() => onLike(post.id)} className={`flex items-center space-x-2 py-2 px-4 rounded-md w-full justify-center transition-colors hover:bg-gray-100 ${hasLiked ? 'text-red-500 font-semibold' : ''}`}>
          <LikeIcon filled={hasLiked} /> <span>Like</span>
        </button>
        <button 
          onClick={() => setShowCommentInput(!showCommentInput)} 
          className="flex items-center space-x-2 py-2 px-4 rounded-md w-full justify-center hover:bg-gray-100"
        >
          <CommentIcon /> <span>Comment</span>
        </button>
      </div>

      <div className="mt-4 space-y-3">
        {post.comments.map(comment => {
          const commenter = findUserById(comment.userId, users);
          if (!commenter) return null;
          return (
            <div key={comment.id} className="flex items-start space-x-3">
              <img 
                src={commenter.avatar} 
                alt={commenter.name} 
                className="h-9 w-9 rounded-full object-cover cursor-pointer" 
                onClick={() => onViewProfile(commenter.id)}
              />
              <div className="bg-gray-100 p-2 rounded-lg flex-1">
                <p 
                  className="font-semibold text-xs text-gray-800 cursor-pointer hover:underline"
                  onClick={() => onViewProfile(commenter.id)}
                >
                  {commenter.name}
                </p>
                <p className="text-sm text-gray-700">{comment.text}</p>
              </div>
            </div>
          );
        })}
      </div>
      {showCommentInput && (
        <form onSubmit={handleCommentSubmit} className="mt-4 flex items-center space-x-3">
          <img src={currentUser.avatar} alt="You" className="h-9 w-9 rounded-full object-cover"/>
          <input 
            type="text" 
            value={commentText} 
            onChange={e => setCommentText(e.target.value)} 
            placeholder="Add a comment..." 
            className="w-full bg-gray-100 border border-gray-200 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </form>
      )}

      {isEditModalOpen && (
        <EditPostModal post={post} onClose={() => setEditModalOpen(false)} onSave={onEditPost} />
      )}
    </div>
  );
};

// Profile Sidebar Component
const ProfileSidebar: FC<{ user: User, onViewProfile: (userId: number) => void }> = ({ user, onViewProfile }) => (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-20 bg-cover bg-center" style={{ backgroundImage: `url(${user.coverPhoto})` }}></div>
        <div className="p-4 text-center border-b border-gray-200">
            <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-20 h-20 rounded-full mx-auto -mt-14 border-4 border-white object-cover cursor-pointer"
                onClick={() => onViewProfile(user.id)}
            />
            <h3 
                className="text-lg font-semibold mt-2 cursor-pointer hover:underline" 
                onClick={() => onViewProfile(user.id)}
            >
                {user.name}
            </h3>
            <p className="text-sm text-gray-500">{user.bio}</p>
        </div>
        <div className="p-4">
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Connections</span>
                <span className="text-blue-600 font-semibold">{user.connections.length}</span>
            </div>
            <p className="text-sm font-semibold mt-1">Grow your network</p>
        </div>
    </div>
);


// Home Page Component
const HomePage: FC<{
  posts: Post[];
  users: User[];
  currentUser: User;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onAddPost: (content: string, file: File | null) => void;
  onEditPost: (updatedPost: Post) => void;
  onDeletePost: (postId: number) => void;
  onViewProfile: (userId: number) => void;
}> = ({ posts, users, currentUser, onLike, onAddComment, onAddPost, onEditPost, onDeletePost, onViewProfile }) => {
  const feedUserIds = [currentUser.id, ...currentUser.connections];
  const feedPosts = posts
    .filter(post => feedUserIds.includes(post.userId))
    .sort((a, b) => b.id - a.id);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block md:col-span-1">
            <ProfileSidebar user={currentUser} onViewProfile={onViewProfile} />
        </div>
        <div className="md:col-span-3 lg:col-span-2">
            <CreatePost currentUser={currentUser} onAddPost={onAddPost} />
            {feedPosts.map(post => (
            <PostCard
                key={post.id}
                post={post}
                users={users}
                currentUserId={currentUser.id}
                onLike={onLike}
                onAddComment={onAddComment}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
                onViewProfile={onViewProfile}
            />
            ))}
        </div>
        <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="font-semibold mb-2">SimpleLinkedin News</h3>
                <ul className="space-y-2 text-sm">
                    <li className="font-semibold">AI is transforming industries</li>
                    <p className="text-xs text-gray-500">Top news - 1,283 readers</p>
                    <li className="font-semibold">The future of remote work</li>
                    <p className="text-xs text-gray-500">3d ago - 892 readers</p>
                </ul>
            </div>
        </div>
    </div>
  );
};

// Profile Page Component
const ProfilePage: FC<{
  userToDisplay: User;
  currentUser: User;
  posts: Post[];
  users: User[];
  onEditProfile: () => void;
  onLike: (postId: number) => void;
  onAddComment: (postId: number, text: string) => void;
  onEditPost: (updatedPost: Post) => void;
  onDeletePost: (postId: number) => void;
  onViewProfile: (userId: number) => void;
}> = ({ userToDisplay, currentUser, posts, users, onEditProfile, onLike, onAddComment, onEditPost, onDeletePost, onViewProfile }) => {
    const userPosts = posts.filter(p => p.userId === userToDisplay.id).sort((a,b) => b.id - a.id);
    const isOwnProfile = userToDisplay.id === currentUser.id;

  return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-3">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                    <img src={userToDisplay.coverPhoto} alt="Cover" className="w-full h-40 sm:h-52 object-cover" />
                    {isOwnProfile && (
                        <button 
                            onClick={onEditProfile} 
                            className="absolute top-4 right-4 flex items-center gap-2 border bg-white/80 backdrop-blur-sm border-gray-300 text-gray-700 font-bold py-2 px-3 rounded-full transition-colors hover:bg-white text-sm"
                        >
                            <EditIcon className="w-4 h-4" /> <span>Edit Profile</span>
                        </button>
                    )}
                </div>
                <div className="p-6 relative">
                    <div className="absolute left-8 -top-16">
                        <img src={userToDisplay.avatar} alt="Profile" className="h-32 w-32 rounded-full border-4 border-white object-cover" />
                    </div>
                    <div className="pt-16">
                        <h2 className="text-2xl font-bold text-gray-900">{userToDisplay.name}</h2>
                        <p className="text-md text-gray-600">{userToDisplay.bio}</p>
                        <p className="text-sm text-gray-500 mt-1">{userToDisplay.location}</p>
                    </div>
                </div>
                 <div className="border-t border-gray-200 p-6">
                    <h3 className="text-xl font-semibold text-gray-800">About</h3>
                    <p className="mt-2 text-gray-700 whitespace-pre-wrap">{userToDisplay.about}</p>
                </div>
            </div>
        </div>

        <div className="lg:col-span-3">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{isOwnProfile ? "My Posts" : `${userToDisplay.name.split(' ')[0]}'s Posts`}</h3>
            {userPosts.length > 0 ? userPosts.map(post => (
                <PostCard
                    key={post.id}
                    post={post}
                    users={users}
                    currentUserId={currentUser.id}
                    onLike={onLike}
                    onAddComment={onAddComment}
                    onEditPost={onEditPost}
                    onDeletePost={onDeletePost}
                    onViewProfile={onViewProfile}
                />
            )) : <p className="bg-white rounded-lg border p-4 text-gray-500">{isOwnProfile ? "You haven't posted anything yet." : "This user hasn't posted anything yet."}</p>}
        </div>
    </div>
  );
};


// Network Page Component
const NetworkPage: FC<{
  currentUser: User;
  users: User[];
  onToggleConnection: (userId: number) => void;
  onViewProfile: (userId: number) => void;
}> = ({ currentUser, users, onToggleConnection, onViewProfile }) => {
  const otherUsers = users.filter(u => u.id !== currentUser.id);

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <h3 className="text-xl font-bold text-gray-800 mb-4">People you may know</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {otherUsers.map(user => {
          const isConnected = currentUser.connections.includes(user.id);
          return (
            <div key={user.id} className="text-center bg-white rounded-lg border border-gray-200 p-4 flex flex-col items-center">
              <img src={user.avatar} alt={user.name} className="h-20 w-20 rounded-full mb-2 object-cover cursor-pointer" onClick={() => onViewProfile(user.id)} />
              <p className="font-bold cursor-pointer hover:underline" onClick={() => onViewProfile(user.id)}>{user.name}</p>
              <p className="text-sm text-gray-500 h-10 overflow-hidden">{user.bio}</p>
              <button
                onClick={() => onToggleConnection(user.id)}
                className={`mt-4 w-full px-4 py-2 text-sm font-bold rounded-full transition-colors ${isConnected
                    ? 'border border-gray-500 text-gray-600 hover:bg-gray-200'
                    : 'bg-blue-100 text-blue-700 hover:bg-blue-200 border border-blue-200'
                  }`}
              >
                {isConnected ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  );
};

// --- MODAL COMPONENTS ---

const ModalWrapper: FC<{ children: React.ReactNode; title: string; onClose: () => void; }> = ({ children, title, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-2xl animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto">
            {children}
        </div>
      </div>
    </div>
);


const EditProfileModal: FC<{
  user: User;
  onClose: () => void;
  onSave: (updatedUser: User) => void;
}> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [previewAvatar, setPreviewAvatar] = useState<string>(user.avatar);
  const [previewCover, setPreviewCover] = useState<string>(user.coverPhoto);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      if (type === 'avatar') {
        setAvatarFile(file);
        setPreviewAvatar(url);
      } else {
        setCoverFile(file);
        setPreviewCover(url);
      }
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let updatedUser = { ...formData, avatar: previewAvatar, coverPhoto: previewCover };
    onSave(updatedUser);
    onClose();
  };

  return (
    <ModalWrapper title="Edit Profile" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Profile Picture</label>
            <div className="flex items-center gap-4">
              <img src={previewAvatar} alt="Avatar Preview" className="h-20 w-20 rounded-full object-cover border-2 border-gray-200" />
              <input id="avatar-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'avatar')} className="hidden" />
              <label htmlFor="avatar-upload" className="cursor-pointer border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-50">Change</label>
            </div>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">Cover Photo</label>
            <div className="flex items-center gap-4">
              <img src={previewCover} alt="Cover Preview" className="h-24 w-full rounded-md object-cover border-2 border-gray-200" />
            </div>
            <input id="cover-upload" type="file" accept="image/*" onChange={(e) => handleFileChange(e, 'cover')} className="hidden" />
            <label htmlFor="cover-upload" className="mt-2 inline-block cursor-pointer border border-gray-300 px-4 py-2 rounded-full text-sm font-semibold hover:bg-gray-50">Change Cover Photo</label>
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="name">Name</label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="name" name="name" type="text" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="location">Location</label>
            <input className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" id="location" name="location" type="text" value={formData.location} onChange={handleChange} />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="bio">Bio</label>
            <textarea className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20" id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="A short bio that appears under your name" />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1" htmlFor="about">About</label>
            <textarea className="border rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32" id="about" name="about" value={formData.about} onChange={handleChange} placeholder="Tell us more about yourself..." />
          </div>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full transition-colors" type="button" onClick={onClose}>Cancel</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors" type="submit">Save</button>
        </div>
      </form>
    </ModalWrapper>
  );
};


const EditPostModal: FC<{
  post: Post;
  onClose: () => void;
  onSave: (updatedPost: Post) => void;
}> = ({ post, onClose, onSave }) => {
  const [formData, setFormData] = useState(post);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(post.media?.url || null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, content: e.target.value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const url = URL.createObjectURL(file);
      setMediaFile(file);
      setPreviewUrl(url);
      setFormData(prev => ({
        ...prev,
        media: { type: file.type.startsWith('image/') ? 'image' : 'video', url }
      }));
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const removeMedia = () => {
    setMediaFile(null);
    setPreviewUrl(null);
    setFormData(prev => ({ ...prev, media: undefined }));
  };

  return (
    <ModalWrapper title="Edit Post" onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
            rows={5}
            value={formData.content}
            onChange={handleChange}
            placeholder="What's on your mind?"
        />
        {previewUrl && formData.media && (
          <div className="mt-4 relative">
            {formData.media.type === 'image' ? 
              <img src={previewUrl} alt="Preview" className="rounded-lg max-h-80 w-full object-contain" /> : 
              <video src={previewUrl} controls className="rounded-lg max-h-80 w-full" />}
            <button type="button" onClick={removeMedia} className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-opacity-80">&times;</button>
          </div>
        )}
        <div className="flex justify-between items-center mt-4">
            <input id="edit-media-upload" type="file" accept="image/*,video/*" onChange={handleFileChange} className="hidden" />
            <label htmlFor="edit-media-upload" className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2">
                <PhotoIcon/> Change Media
            </label>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t">
          <button type="button" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={onClose}>Cancel</button>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Save</button>
        </div>
      </form>
    </ModalWrapper>
  );
};


// --- MAIN APP COMPONENT ---
const App = () => {
  // State management for users, posts, current user, page, and modals
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [currentUser, setCurrentUser] = useState<User>(users[0]);
  const [currentPage, setCurrentPage] = useState<Page>('Home');
  const [isEditProfileModalOpen, setEditProfileModalOpen] = useState(false);
  const [viewedUserId, setViewedUserId] = useState<number>(currentUser.id);


  // Effect to update the currentUser object if the main users array changes
  useEffect(() => {
    const updatedCurrentUser = users.find(u => u.id === currentUser.id);
    if (updatedCurrentUser) {
      setCurrentUser(updatedCurrentUser);
    }
  }, [users, currentUser.id]);

  // --- HANDLER FUNCTIONS ---
  // These functions manage state changes based on user interactions.

  const handleNavigate = (page: Page) => {
    if (page === 'Profile') {
      setViewedUserId(currentUser.id); // Ensure "Me" tab goes to own profile
    }
    setCurrentPage(page);
  };

  const handleViewProfile = (userId: number) => {
    setViewedUserId(userId);
    setCurrentPage('Profile');
  };

  const handleUpdateProfile = (updatedUser: User) => {
    setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    setEditProfileModalOpen(false); // Close modal on save
  };

  const handleLikePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(currentUser.id);
        const newLikes = hasLiked
          ? post.likes.filter(id => id !== currentUser.id)
          : [...post.likes, currentUser.id];
        return { ...post, likes: newLikes };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: number, text: string) => {
    setPosts(prevPosts => prevPosts.map(post => {
      if (post.id === postId) {
        const newComment: Comment = {
          id: Date.now(),
          userId: currentUser.id,
          text,
        };
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
  };

  const handleAddPost = (content: string, file: File | null) => {
    const newPost: Post = {
      id: Date.now(),
      userId: currentUser.id,
      content,
      likes: [],
      comments: []
    };
    if (file) {
      newPost.media = {
        type: file.type.startsWith('image') ? 'image' : 'video',
        url: URL.createObjectURL(file)
      };
    }
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleToggleConnection = (userIdToConnect: number) => {
    setUsers(prevUsers => {
        const isConnected = currentUser.connections.includes(userIdToConnect);
        return prevUsers.map(user => {
            if (user.id === currentUser.id) {
                const connections = isConnected 
                    ? user.connections.filter(id => id !== userIdToConnect)
                    : [...user.connections, userIdToConnect];
                return { ...user, connections };
            }
            if (user.id === userIdToConnect) {
                const connections = isConnected 
                    ? user.connections.filter(id => id !== currentUser.id)
                    : [...user.connections, currentUser.id];
                return { ...user, connections };
            }
            return user;
        });
    });
  };

  const handleEditPost = (updatedPost: Post) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === updatedPost.id ? updatedPost : post
    ));
  };

  const handleDeletePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };
  
  // --- RENDER LOGIC ---
  const renderPage = () => {
    switch(currentPage) {
      case 'Home':
        return <HomePage posts={posts} users={users} currentUser={currentUser} onLike={handleLikePost} onAddComment={handleAddComment} onAddPost={handleAddPost} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onViewProfile={handleViewProfile} />;
      case 'Profile': {
        const userToDisplay = findUserById(viewedUserId, users);
        if (!userToDisplay) {
            // Fallback to home if user not found
            setCurrentPage('Home');
            return null;
        }
        return <ProfilePage userToDisplay={userToDisplay} currentUser={currentUser} posts={posts} users={users} onEditProfile={() => setEditProfileModalOpen(true)} onLike={handleLikePost} onAddComment={handleAddComment} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onViewProfile={handleViewProfile} />;
      }
      case 'Network':
        return <NetworkPage currentUser={currentUser} users={users} onToggleConnection={handleToggleConnection} onViewProfile={handleViewProfile} />;
      default:
        return <HomePage posts={posts} users={users} currentUser={currentUser} onLike={handleLikePost} onAddComment={handleAddComment} onAddPost={handleAddPost} onEditPost={handleEditPost} onDeletePost={handleDeletePost} onViewProfile={handleViewProfile} />;
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header
        user={currentUser}
        onNavigate={handleNavigate}
        activePage={currentPage}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {renderPage()}
      </main>
      {isEditProfileModalOpen && (
        <EditProfileModal
          user={currentUser}
          onClose={() => setEditProfileModalOpen(false)}
          onSave={handleUpdateProfile}
        />
      )}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
        @keyframes fade-in-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;