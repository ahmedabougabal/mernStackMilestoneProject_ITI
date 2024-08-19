import express from "express";
import { listRead } from '../models/modelListRead.js';
import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
import User from "../models/userModel.js";

const router = express.Router();

router.get("/getAllList", async (request, response) => {
    try {
        const list = await listRead.find({}).populate("book").populate("author");
        response.json(list);  // Use `response` instead of `res`
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.get("/getUserList", async (request, response) => {
    try {
        const userList = await listRead.find({ user: request.user._id });  // Use `request` instead of `req`
        response.json(userList);  // Use `response` instead of `res`
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

router.post("/addToRead/:id", async (request, response) => {
    try {
        const { author, Book, user, status } = request.body;  // Use `request` instead of `req`

        if (!Book || !author || !user || !status) {
            return response.status(400).send({
                message: "Send all required fields",
            });
        }


        const newPost = new listRead({
            name: "mahmoud",
            author: author,
            book: Book,  // Storing the reference to the book
            user: user,  // Storing the reference to the user
            status: status,


        });

        // Save the new post
        await newPost.save();
        response.status(201).json(newPost);  // Respond with the newly created post
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
