import mongoose from "mongoose";

// Define the Author schema
const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: Date,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

// Create the Author model
export const Author = mongoose.model("Author", authorSchema);
