import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
});

export const Category = mongoose.model("Category", CategorySchema);
