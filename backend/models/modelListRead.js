import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    Book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    status: {
        type: String,
        enum: ['read', 'reading', 'want to read'],  // The status field can only have these values
        required: true,  // Makes the field required
        default: 'want to read',  // Optional: set a default value
    },
  });
  
  export const Book = mongoose.model("listRead", schema);



shelve