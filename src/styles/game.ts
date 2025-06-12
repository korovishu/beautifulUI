export const styles = {
  container: (darkMode: boolean) =>
    `min-h-screen flex flex-col justify-center items-center ${
      darkMode ? "bg-zinc-900 text-white" : "bg-gray-100 text-black"
    } p-4`,

  button: (darkMode: boolean) =>
    `${
      darkMode
        ? "bg-orange-500 hover:bg-orange-600 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    } transition-colors`,

  error: "text-red-500 text-sm font-medium mb-4",

  heading: "text-4xl font-bold mb-4",

  gameOverText: "text-2xl font-bold mb-2",
}; 