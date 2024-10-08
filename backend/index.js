import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import CORS to solve the problem between front and backend :)

import booksRoute from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import categoryRoutes from "./routes/categories.js";
import listRoutes from "./routes/list.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const Port = process.env.PORT || 5200;
console.log("MONGO_URI:", process.env.MONGO_URI); // just for Debugging

connectDB();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Enable CORS for all routes
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/api/users", userRoutes);
app.use("/books", booksRoute);
app.use("/", authorRoutes);
app.use("/", categoryRoutes);
app.use("/", listRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(Port, () => console.log(`server is up and running on port: ${Port}`));
