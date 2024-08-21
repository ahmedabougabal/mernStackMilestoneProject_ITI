import express from "express";
import mongoose from "mongoose";
import { Author } from "../models/Author.js";
import { Book } from "../models/Book.js";

const router = express.Router();

// Route to Add a New Author
router.post("/addAuthor", async (request, response) => {
  try {
    const { id, firstName, lastName, birthDate, books } = request.body;

    if (!firstName || !lastName || !birthDate) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    // Create the new author object
    const newAuthor = {
      firstName,
      lastName,
      birthDate,
      books: books || [],
    };

    const author = await Author.create(newAuthor);

    return response.status(201).send(author);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get All Authors
router.get("/authors", async (request, response) => {
  try {
    const authors = await Author.find({});

    return response.status(200).json({
      count: authors.length,
      data: authors,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get One Author by ID
router.get("/authors/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid author ID format" });
    }

    const author = await Author.findById(id);

    if (!author) {
      return response.status(404).json({ message: "Author not found" });
    }

    return response.status(200).json(author);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Update an Author
router.put("/authors/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { firstName, lastName, birthDate, books } = request.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid author ID format" });
    }

    if (!firstName || !lastName || !birthDate) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const updatedAuthor = {
      firstName,
      lastName,
      birthDate,
      books: books || [],
    };

    const result = await Author.findByIdAndUpdate(id, updatedAuthor, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Author not found" });
    }

    return response
      .status(200)
      .send({ message: "Author updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete an Author
router.delete("/authors/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({ message: "Invalid author ID format" });
    }

    const result = await Author.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Author not found" });
    }

    return response
      .status(200)
      .send({ message: "Author deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all books by a specific author
router.get("/:authorId/books", async (req, res) => {
  try {
    const { authorId } = req.params;

    // Validate the provided authorId
    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid author ID." });
    }

    // Find books that match the given authorId
    const books = await Book.find({ AuthorId: authorId });

    // If no books are found, return a 404 status
    if (books.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for this author." });
    }

    // Return the found books as JSON
    res.json(books);
  } catch (error) {
    console.error("Error fetching books by author:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching books." });
  }
});

export default router;
