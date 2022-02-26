const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
    isbn: { type: Number, required: true },
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    published: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Book", BookSchema);