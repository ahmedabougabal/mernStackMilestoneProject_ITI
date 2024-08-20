import express from "express";
import { listRead } from '../models/modelListRead.js';
import { Book } from "../models/Book.js";
import { Author } from "../models/Author.js";
import User from "../models/userModel.js";

const router = express.Router();

// router.get("/getAllList", async (request, response) => {
//     try {
//         const list = await listRead.find({}).populate("book").populate("author");
//         response.json(list);  // Use `response` instead of `res`
//     } catch (error) {
//         response.status(500).json({ error: error.message });
//     }
// });

router.get("/getAllList", async (request, response) => {
    try {
        // Find all documents and populate the `book` and `author` fields
        const list = await listRead.find({})
            .populate('items.book')  // Populate `book` field in each item
            .populate('items.author');  // Populate `author` field in each item

        response.status(200).json(list);  // Respond with the list of documents
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// router.get("/getUserList/:id", async (request, response) => {
//     try {
//         const userList = await listRead.find({ user: request.user._id });  // Use `request` instead of `req`
//         response.json(userList);  // Use `response` instead of `res`
//     } catch (error) {
//         response.status(500).json({ error: error.message });
//     }
// });



router.get("/getUserList/:id", async (request, response) => {
    try {
        const userId = request.params.id;  // Get user ID from URL parameters

        if (!userId) {
            return response.status(400).json({ message: "User ID is required" });
        }

        // Find documents that match the user ID and populate references if needed
        const userList = await listRead.find({ user: userId })
            .populate('items.book')  // Populate `book` field in each item if your schema includes it
            .populate('items.author');  // Populate `author` field in each item if your schema includes it

        if (userList.length === 0) {
            return response.status(404).json({ message: "No lists found for this user" });
        }

        response.status(200).json(userList);  // Respond with the list of documents
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

// router.post("/addToRead/:id", async (request, response) => {
//     try {
//         const { author, Book, user, status } = request.body;  // Use `request` instead of `req`

//         if (!Book || !author || !user || !status) {
//             return response.status(400).send({
//                 message: "Send all required fields",
//             });
//         }


//         const newPost = new listRead({
//             name: "mahmoud",
//             author: author,
//             book: Book,  // Storing the reference to the book
//             user: user,  // Storing the reference to the user
//             status: status,


//         });

//         // Save the new post
//         await newPost.save();
//         response.status(201).json(newPost);  // Respond with the newly created post
//     } catch (error) {
//         response.status(500).json({ error: error.message });
//     }
// });

router.post("/addToRead", async (request, response) => {
    try {
        const { user, author, book, status } = request.body;

        if (!user || !author || !book || !status) {
            return response.status(400).send({
                message: "Send all required fields",
            });
        }

        // Create a new item to be added to the array
        const newItem = {
            author: author,
            book: book,
            user: user,
            status: status,
        };

        // Find the document by user and update it
        const updatedPost = await listRead.findOneAndUpdate(
            { user: user }, // Filter by user
            { $push: { items: newItem } },  // Add the new item to the items array
            { new: true, upsert: true, runValidators: true }  // Return the updated document, create if it doesn't exist
        );

        if (!updatedPost) {
            return response.status(404).send({
                message: "Document not found or created",
            });
        }

        response.status(200).json(updatedPost);  // Respond with the updated document
    } catch (error) {
        response.status(500).json({ error: error.message });
    }
});

export default router;
