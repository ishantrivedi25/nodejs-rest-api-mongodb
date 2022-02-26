const BookModel = require("../models/BookModel");
const { successResponse, errorResponse } = require("../helpers/apiResponse");

exports.listBooks = (req, res) => {
    BookModel.find({}).select({ createdAt: 0, updatedAt: 0, __v: 0 }).then((books) => {
        if (books) {
            return successResponse(res, "Data retrieved successfully.", books);
        }
        return errorResponse(res, "Something went wrong", 500);
    })
}

exports.addNewBook = (req, res) => {
    const { title, author, description, isbn, published } = req.body;

    BookModel.findOne({ isbn }).then((book) => {
        if (book) {
            return errorResponse(res, "Book already exists with same ISBN", 400);
        } else {
            const bookData = { isbn, title, author, description, published }
            BookModel.create(bookData).then((book) => {
                if (book) {
                    const responseData = {
                        isbn: book.isbn,
                        title: book.title,
                        author: book.author
                    }
                    return successResponse(res, "Book added successfully.", responseData);
                } else {
                    return errorResponse(res, "Something went wrong", 500);
                }
            }).catch((err) => {
                return errorResponse(res, "Something went wrong", 500);
            })
        }
    }).catch((err) => {
        return errorResponse(res, "Something went wrong", 500);
    })
};

exports.deleteBook = (req, res) => {
    const bookId = req.params?.id;
    BookModel.deleteOne({ _id: bookId }).then((book) => {
        if (book?.deletedCount) {
            return successResponse(res, "Book deleted successfully", {});
        }
        return errorResponse(res, "No data found!", 400);
    }).catch((err) => {
        return errorResponse(res, "Please enter valid id", 400);
    })
}

exports.updateBook = (req, res) => {
    const bookId = req.params?.id;

    BookModel.updateOne({ _id: bookId }, req.body).then((response) => {
        if (response) {
            return successResponse(res, "Data retrieved successfully.", book);
        }
        return errorResponse(res, "No data found!", 400);
    }).catch((err) => {
        return errorResponse(res, "Please enter valid id", 400);
    })
}

exports.bookDetails = (req, res) => {
    const bookId = req.params?.id;

    BookModel.findById(bookId).select({ createdAt: 0, updatedAt: 0, __v: 0 }).then((book) => {
        if (book) {
            return successResponse(res, "Data retrieved successfully.", book);
        }
        return errorResponse(res, "No data found!", 400);
    }).catch((err) => {
        return errorResponse(res, "Please enter valid id", 400);
    })
}