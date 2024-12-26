const express = require('express');
const book = require('./book.model');
const { postABook, getAllBooks, getSingleBook, updateBookData, deleteBook } = require('./book.controller');
const verifyAminToken = require('../middleware/verifyAdminToken');
const router = express.Router();


// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
//post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// post a book
router.post("/create-book", verifyAminToken, postABook);

// Get All Book
router.get("/", getAllBooks);

// get single book details (endpoint)
router.get("/:id", getSingleBook);

// update book data (endpoint)
router.put("/edit/:id", verifyAminToken, updateBookData);

// delete data
router.delete('/:id', verifyAminToken, deleteBook);

module.exports = router;