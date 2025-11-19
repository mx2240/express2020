const mongoose = require("mongoose");

const BorrowRecordSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",           // use "User" if your users are in models/User.js
            required: true,
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Book",
            required: true,
        },

        borrowDate: {
            type: Date,
            default: Date.now,
        },

        dueDate: {
            type: Date,
            required: true,
            default: () => new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) // 14 days from now
        },

        returnDate: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["borrowed", "returned", "overdue"],
            default: "borrowed",
        },

        fineAmount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("BorrowRecord", BorrowRecordSchema);
