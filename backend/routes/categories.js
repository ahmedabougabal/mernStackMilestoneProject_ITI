import express from "express";
import { Category } from "../models/Category.js";
import { Book } from "../models/Book.js";

const router = express.Router();

// Route to Add a New Category
router.post("/addCategory", async (request, response) => {
  try {
    const { name } = request.body;

    if (!name) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const newCategory = {
      name,
    };

    const category = await Category.create(newCategory);

    return response.status(201).send(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get All Categories
router.get("/categories", async (request, response) => {
  try {
    const categories = await Category.find({});

    return response.status(200).json({
      count: categories.length,
      data: categories,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Get One Category by ID
router.get("/categories/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const category = await Category.findById(id);

    if (!category) {
      return response.status(404).json({ message: "Category not found" });
    }

    return response.status(200).json(category);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Update a Category
router.put("/categories/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const { name } = request.body;

    if (!name) {
      return response.status(400).send({
        message: "Send all required fields",
      });
    }

    const updatedCategory = { name };

    const result = await Category.findByIdAndUpdate(id, updatedCategory, {
      new: true,
    });

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }

    return response
      .status(200)
      .send({ message: "Category updated successfully", data: result });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route to Delete a Category
router.delete("/categories/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Category.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Category not found" });
    }

    return response
      .status(200)
      .send({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Get all books in a specific category
router.get("/:categoryId/books", async (req, res) => {
  const { categoryId } = req.params;
  const books = await Book.find({ category: categoryId }).populate(
    "category author"
  );
  res.json(books);
});

export default router;
