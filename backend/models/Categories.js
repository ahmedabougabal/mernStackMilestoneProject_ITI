import mongoose from "mongoose";

// Import the Book model to use for referencing
import { Book } from "./Book.js";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
    },
  ],
});

export const Category = mongoose.model("Category", categorySchema);
