const express = require("express");

const authorizeRequest = require("../middlewares/authorizeRequest");
const { addNewBook, listBooks, bookDetails, deleteBook, updateBook } = require("../controllers/BookController");
const { addBookValidator, updateBookValidator } = require("../middlewares/validators/BookSchema");

const router = express.Router();

router.get("/", authorizeRequest, listBooks);
router.get("/:id", authorizeRequest, bookDetails);
router.post("/", authorizeRequest, addBookValidator, addNewBook);
router.put("/:id", authorizeRequest, updateBookValidator, updateBook);
router.delete("/:id", authorizeRequest, deleteBook);

module.exports = router;