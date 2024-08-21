import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date },
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }],
});

export const Author = mongoose.model("Author", authorSchema);
