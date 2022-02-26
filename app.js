const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");

const authRoute = require("./routes/auth");
const bookRoute = require("./routes/book");
const mongoose = require("mongoose");

/* MongoDB Connection */
const MONGODB_URL = process.env.MONGODB_URL;

mongoose.connect(MONGODB_URL).then(() => {
    console.log("DB Connected Successfully");
});

const app = express();
const port = process.env.PORT;

/** Middlewares */
app.use(bodyParser.json());
app.use(cors()); //To enable all CORS requests
app.use(morgan("dev")); //To enable logger for server

/* Routes */
app.use("/api/v1/auth/", authRoute);
app.use("/api/v1/book/", bookRoute);

app.listen(port, () => { console.log("Listening on port", port); });

module.exports = app;