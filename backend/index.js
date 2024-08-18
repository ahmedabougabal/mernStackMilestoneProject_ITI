import path from "path"
import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
// const BookRouter = require('./routes/books.js');
import booksRoute from './routes/books.js';
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js";
import { createUser } from "./controllers/userController.js";

dotenv.config()
const Port = process.env.PORT || 5200

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/books', booksRoute);
app.use("/api/users", userRoutes);


app.get('/', (req, res) => {
    res.send('Server is running')
})

app.listen(Port, () => console.log(`server running on port: ${Port}`))