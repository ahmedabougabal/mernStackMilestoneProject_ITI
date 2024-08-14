import mongoose from "mongoose";
let MONGO_URI =
  "mongodb+srv://MARNBookStore:4Hf89zYymjHX9jx4@bookstoreapp.ks6he.mongodb.net/?retryWrites=true&w=majority&appName=BookStoreApp";
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("successfull connected to DB");
  } catch (error) {}
};
export default connectDB;
