import axios from "axios";

const API_URL = "http://localhost:5200";




//------------------------- ----------- ---------------------------//
//-------------------------- books ---------------------------//
//------------------------- ----------- ---------------------------//

// Fetch all books
export const getBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

// Fetch a single book by ID
export const getBookById = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};

// Add a new book
export const addBook = async (bookData) => {
  return await axios.post(`${API_URL}/books`, bookData);
};

// Update a book
export const updateBook = async (id, bookData) => {
  return await axios.put(`${API_URL}/books/${id}`, bookData);
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

// Fetch books by category ID
export const getBooksByCategory = async (categoryId) => {
  return await axios.get(`${API_URL}/books/category/${categoryId}`);
};


//------------------------- ----------- ---------------------------//
//-------------------------- lsit ---------------------------//
//------------------------- ----------- ---------------------------//


// Fetch a single list user by user ID
export const getUserList = async (id) => {
  return await axios.get(`${API_URL}/getUserList/${id}`);
};