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
    type: mongoose.Schema.Types.ObjectId,ref: "Category",
    required: true,
  },
  AuthorId: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,ref: "Author",
    required: true,
  },
  image: {
    type: String,
    required: true,
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
