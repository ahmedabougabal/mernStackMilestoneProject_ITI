import axios from "axios";

const API_URL = "http://localhost:5200";

// Fetch all books
export const getBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

// Fetch all authors
export const getAuthors = async () => {
  return await axios.get(`${API_URL}/authors`);
};

// Fetch all categories
export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};

// Add a new category
export const addCategory = async (categoryData) => {
  return await axios.post(`${API_URL}/addCategory`, categoryData);
};

// Update a category by ID
export const updateCategory = async (id, categoryData) => {
  return await axios.put(`${API_URL}/categories/${id}`, categoryData);
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  return await axios.delete(`${API_URL}/categories/${id}`);
};
