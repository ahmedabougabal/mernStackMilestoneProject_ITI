import axios from "axios";

const API_URL = "http://localhost:5200";

// Fetch all books
export const getBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};

//------------------------- ----------- ---------------------------//
//-------------------------- authors ---------------------------//
//------------------------- ----------- ---------------------------//

// Fetch all authors
export const getAuthors = async () => {
  return await axios.get(`${API_URL}/authors`);
};

// Add a new Author
export const addAuthor = async (authorData) => {
  return await axios.post(`${API_URL}/addAuthor`, authorData);
};

// Delete a new Author
export const deleteAuthor = async (id) => {
  return await axios.delete(`${API_URL}/authors/${id}`);
};

// Update a Author by ID
export const updateAuthor = async (id, authorData) => {
  return await axios.put(`${API_URL}/authors/${id}`, authorData);
};

// Fetch books by author ID
export const getBooksByAuthor = async (authorId) => {
  return await axios.get(`${API_URL}/books/author/${authorId}`);
};

//------------------------- ----------- ---------------------------//
//-------------------------- categories ---------------------------//
//------------------------- ----------- ---------------------------//

// Fetch all categories
export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

// Add a new category
export const addCategory = async (categoryData) => {
  return await axios.post(`${API_URL}/addCategory`, categoryData);
};

// Delete a category by ID
export const deleteCategory = async (id) => {
  return await axios.delete(`${API_URL}/categories/${id}`);
};

// Update a category by ID
export const updateCategory = async (id, categoryData) => {
  return await axios.put(`${API_URL}/categories/${id}`, categoryData);
};
