import axios from "axios";

const API_URL = "http://localhost:5200";

export const getBooks = async () => {
  return await axios.get(`${API_URL}/books`);
};

export const getAuthors = async () => {
  return await axios.get(`${API_URL}/authors`);
};

export const getCategories = async () => {
  return await axios.get(`${API_URL}/categories`);
};

export const getBookById = async (id) => {
  return await axios.get(`${API_URL}/books/${id}`);
};
