import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // id: {
  //   type: String,
  // },
  title: {
    type: String,
    required: true,
  },
  Category: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Category",
    required: true,
  },
  AuthorId: {
    // type: mongoose.Schema.Types.ObjectId,
    type: String,
    ref: "Author",
    required: true,
  },
  image: {
    type: String,
  },
  rating: {
    type: Number,
  },
  description: {
    type: String,
  },
  reviews: {
    type: Array,
  },
});

export const Book = mongoose.model("Book", schema);
