import mongoose from "mongoose";

const schema = new mongoose.Schema({
  // id: {
  //   type: String,
  // },
  name: {
    type: String,
    required: true,
  },
  Category: {
    type: String,
    type: mongoose.Schema.Types.ObjectId,ref: "Category",
    required: true,
  },
  AuthorId: {
    type: Number,
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

export const Book = mongoose.model('Book', schema);
;