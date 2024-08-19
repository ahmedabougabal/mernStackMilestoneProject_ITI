import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import CORS to solve the problem between front and backend :)

import booksRoute from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import categoryRoutes from "./routes/categories.js";
import connectDB from "./config/db.js";

dotenv.config();
const Port = process.env.PORT || 5200;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173", // Allow the frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    credentials: true, // Allow cookies if needed
  })
);

// app.use("/books", booksRoute);
app.use("/", booksRoute); // Use the books routes
app.use("/", authorRoutes); // This prefixes all routes in `authors.js` with `/api`
app.use("/", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(Port, () => console.log(`server running on port: ${Port}`));
