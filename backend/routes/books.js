import express from 'express';
import { Book } from '../models/Book.js';

const router = express.Router();

router.post('/addBook',async (request, response)=>{
    try {
        if (
          !request.body.name ||
          !request.body.AuthorId ||
          !request.body.CategoryId ||
          !request.body.image 
        ) {
          return response.status(400).send({
            message: 'Send all required fields',
          });
        }
        const newBook = {
        name: request.body.name,
        AuthorId: request.body.AuthorId,
        CategoryId: request.body.CategoryId,
        image: request.body.image,
        };
    
        const book = await Book.create(newBook);
    
        return response.status(201).send(book);
      } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
      }

})

// Route for Get All Books from database
router.get('/', async (request, response) => {
  try {
    const books = await Book.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Book.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.name ||
      !request.body.AuthorId ||
      !request.body.CategoryId ||
      !request.body.image 
    ) {
      return response.status(400).send({
        message: 'Send all required fields',
      });
    }

    const { id } = request.params;

    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Delete a book
router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});




export default router;