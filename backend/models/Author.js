import mongoose from "mongoose";

// Define the Author schema
const authorSchema = new mongoose.Schema({
  id: {
    type: Number,
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
  books: {
    type: String,
  },
});

// Create the Author model
export const Author = mongoose.model("Author", authorSchema);
