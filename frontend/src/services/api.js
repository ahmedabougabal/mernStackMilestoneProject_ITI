import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5200", // Your backend URL
  withCredentials: true, // To handle cookies if needed
});

export default api;
