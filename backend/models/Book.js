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
  avgRating: { type: Number, default: 0 },
  ratingsCount: { type: Number, default: 0 },
  image: { type: String },
});

export const Book = mongoose.model('Book', schema);
;