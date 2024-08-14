import mongoose from "mongoose";

// Define the Author schema
const authorSchema = new mongoose.Schema({
  AuthorId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  books: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book", // Reference to the Book model
    },
  ],
});

// Create the Author model
export const Author = mongoose.model("Author", authorSchema);
