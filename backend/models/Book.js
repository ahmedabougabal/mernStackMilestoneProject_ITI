import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // ID : {
  //     type: String,
  // },
  name: {
    type: String,
    required: true,
  },
  CategoryId: {
    type: Number,
    required: true,
  },
  AuthorId: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  reviews: {
    type: Array,
  },
});

export const Book = mongoose.model("Book", schema);
