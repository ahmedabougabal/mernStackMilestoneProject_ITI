import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { error } from 'console';
const app = express();


// Middleware to connect backend to the front side
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Load environment variables
dotenv.config();

const Port = process.env.PORT || 5000;



//* simple route for testing
app.get('/', (req, res) => {
  res.send('hello Abou Gabal');
});

// ! MongoDB connection setup (from mongodb docs )
const uri = process.env.MONGODB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const bookCollections = client.db("bookInventory").collection("books"); //create db

    // uploading a book using post request
    app.post("/upload-book", async (req, res) => {
      try {
        const data = req.body;
        const result = await bookCollections.insertOne(data);
        res.status(201).send(result);
      }
      catch (error) {
        console.log(`error uploading book ${error.message}`, error)
        res.status(500).send("failed to upload book");
      }
    });

    // get all books from the database


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



// Start the server
app.listen(Port, () => {
  console.log(`Server is up and running on port: ${Port}`);
});