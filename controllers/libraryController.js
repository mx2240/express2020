const Book = require("../models/Book");
const BorrowRecord = require("../models/BorrowRecord");

// ===============================
// ADMIN: Add a New Book
// ===============================
exports.addBook = async (req, res) => {
    try {
        const { title, author, category, isbn, copiesAvailable } = req.body;

        const book = await Book.create({
            title,
            author,
            category,
            isbn,
            copiesAvailable,
            totalCopies: copiesAvailable
        });

        res.status(201).json({ message: "Book added", book });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// Get All Books
// ===============================
exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ title: 1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// STUDENT: Borrow a Book
// ===============================
exports.borrowBook = async (req, res) => {
    try {
        const { bookId, studentId } = req.body;

        const book = await Book.findById(bookId);

        if (!book) return res.status(404).json({ message: "Book not found" });

        if (book.copiesAvailable <= 0)
            return res.status(400).json({ message: "No copies available" });

        book.copiesAvailable -= 1;
        await book.save();

        const record = await BorrowRecord.create({
            book: bookId,
            student: studentId
        });

        res.status(201).json({ message: "Book borrowed", record });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// STUDENT: Return a Book
// ===============================
exports.returnBook = async (req, res) => {
    try {
        const record = await BorrowRecord.findById(req.params.id).populate("book");

        if (!record) return res.status(404).json({ message: "Borrow record not found" });

        if (record.status === "returned")
            return res.status(400).json({ message: "Book already returned" });

        record.status = "returned";
        record.returnDate = new Date();
        await record.save();

        // increase book copies
        const book = await Book.findById(record.book._id);
        book.copiesAvailable += 1;
        await book.save();

        res.json({ message: "Book returned", record });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// STUDENT: My Borrowed Books
// ===============================
exports.myBorrowedBooks = async (req, res) => {
    try {
        const records = await BorrowRecord.find({ student: req.params.studentId })
            .populate("book", "title author")
            .sort({ borrowDate: -1 });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// ===============================
// ADMIN: All Borrow Records
// ===============================
exports.allBorrowRecords = async (req, res) => {
    try {
        const records = await BorrowRecord.find()
            .populate("book", "title")
            .populate("student", "name email")
            .sort({ createdAt: -1 });

        res.json(records);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
