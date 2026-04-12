export const getImageUrl = (photo) => {
  if (!photo) return "/default.jpeg";

  const baseURL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  // Case 1: Image stored via GridFS (MongoDB)
  if (!photo.startsWith("/uploads")) {
    return `${baseURL}/items/image/${photo}`;
  }

  // Case 2: Image stored in public/uploads
  return `${baseURL}${photo}`;
};