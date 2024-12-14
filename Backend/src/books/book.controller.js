const Book = require("./book.model");


// post a book
const postABook = async (req, res) => {
    // console.log(req.body);
    try {
        const newBook = await Book({ ...req.body });
        await newBook.save();
        res.status(200).send({ message: "Book Posted Successfully", book: newBook });
    } catch (error) {
        console.error("Error Creating Book", error);
        res.status(500).send({ message: "Failed To Create Book" });
    }
}

// get all book
const getAllBooks = async (req, res) => {
    try {
        const getBook = await Book.find().sort({ createdAt: -1 });
        res.status(200).send(getBook);
    } catch (error) {
        console.error("Error fetching books", error);
        res.status(500).send({ message: "Failed to fetch books" });
    }
}

// get single book details
const getSingleBook = async (req, res) => {
    try {
        const { id } = req.params;
        const getSinglebook = await Book.findById(id);
        if (!getSinglebook) {
            res.status(404).send({ message: "Book Not Found!" });
        }
        res.status(200).send(getSinglebook);
    } catch (error) {
        console.error("Error fetching book", error);
        res.status(500).send({ message: "Failed to fetch book" });
    }
}

// update book data
const updateBookData = async (req, res) => {
    try {
        const { id } = req.params;
        const updateBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
        if (!updateBook) {
            res.status(404).send({ message: "Book Not Updated!" });
        }
        res.status(200).send({ message: "Book updated successfully", book: updateBook });
    } catch (error) {
        console.error("Error updating a book", error);
        res.status(500).send({ message: "Failed to update a book" });
    }
}

// delete book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);
        if (!deletedBook) {
            res.status(404).send({ message: "Book Not Deleted!" });
        }
        res.status(200).send({ message: "Book deleted successfully", book: deletedBook });
    } catch (error) {
        console.error("Error deleting a book", error);
        res.status(500).send({ message: "Failed to delete a book" });
    }
}

module.exports = {
    postABook,
    getAllBooks,
    getSingleBook,
    updateBookData,
    deleteBook
}