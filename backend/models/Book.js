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
    default:"https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
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
