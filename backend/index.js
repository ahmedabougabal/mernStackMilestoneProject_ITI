import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
// const BookRouter = require('./routes/books.js');
import booksRoute from "./routes/books.js";
import authorRoutes from "./routes/authors.js";
import categoryRoutes from "./routes/categories.js";
import connectDB from "./config/db.js";
import cors from 'cors';


dotenv.config();
const Port = process.env.PORT || 5200;

connectDB();

const app = express();
app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use
app.use("/books", booksRoute);
app.use("/", authorRoutes); // This prefixes all routes in `authors.js` with `/api`
app.use("/", categoryRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(Port, () => console.log(`server running on port: ${Port}`));
