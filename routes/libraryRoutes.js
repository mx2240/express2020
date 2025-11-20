const express = require("express");
const router = express.Router();

const {
    addBook,
    getBooks,
    borrowBook,
    returnBook,
    myBorrowedBooks,
    allBorrowRecords
} = require("../controllers/libraryController");

// Admin
router.post("/add", addBook);
router.get("/records", allBorrowRecords);

// Public
router.get("/books", getBooks);

// Student actions
router.post("/borrow", borrowBook);
router.put("/return/:id", returnBook);
router.get("/my/:studentId", myBorrowedBooks);

module.exports = router;
