import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
  name: { type: String, required: true },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  avgRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  image: { type: String },
});

export const Book = mongoose.model("Book", schema);