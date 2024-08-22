import express from "express";
import mongoose from "mongoose";
import { Book } from "../models/Book.js";

const router = express.Router();

router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.AuthorId ||
      !request.body.Category
    ) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = {
      title: request.body.title,
      AuthorId: request.body.AuthorId,
      Category: request.body.Category,
      image: request.body.image,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid book ID." });
    }

    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put("/:id", async (request, response) => {
  try {
    // if (
    //   !request.body.title ||
    //   !request.body.AuthorId ||
    //   !request.body.Category ||
    //   !request.body.image
    // ) {
    //   return response.status(400).send({
    //     message: "Send all required fields",
    //   });
    // }

    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid book ID." });
    }

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid book ID." });
    }

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

/////////------------------------------------------
/////////------------------------------------------
/////////------------------------------------------

router.get("/author/:id", async (request, response) => {
  try {
    const authorId = request.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid author ID." });
    }

    // Fetch books by authorId
    const books = await Book.find({ AuthorId: authorId });

    if (books.length === 0) {
      return response.status(200).json([]);
    }

    return response.status(200).json(books);
  } catch (error) {
    console.error("Error fetching books by author:", error);
    response.status(500).send({ message: error.message });
  }
});

/////////------------------------------------------
/////////------------------------------------------
/////////------------------------------------------
router.get("/category/:id", async (request, response) => {
  try {
    const { id } = request.params;

    // Check if the category ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid category ID." });
    }

    // Find books where the category matches the ID
    const books = await Book.find({ Category: id });

    if (books.length === 0) {
      return response.status(200).json([]);
    }

    return response.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ responsemessage: error.message });
  }
});
export default router;
