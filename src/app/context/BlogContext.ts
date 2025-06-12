import { createContext, useContext } from "react";

export interface BlogContextType {
  // Define the properties and methods that will be available in the context
  posts: any[]; // Replace 'any' with your post type
  addPost: (post: any) => void; // Replace 'any' with your post type
  removePost: (id: string) => void;
}   

export const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = BlogContext.Provider;
export const BlogConsumer = BlogContext.Consumer;

export const useBlogContext = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlogContext must be used within a BlogProvider");
  }
  return context;
};