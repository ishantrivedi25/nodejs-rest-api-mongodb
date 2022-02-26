const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const { errorResponse } = require("../helpers/apiResponse");

module.exports = (req, res, next) => {
    let token = req.headers.authorization;
    const jwtSecretKey = process.env.JWT_SECRET_KEY;

    if (token) {
        try {
            let decodedData = jwt.verify(token, jwtSecretKey);

            if (decodedData && decodedData.user_token) {
                const userId = decodedData.user_token;

                UserModel.findOne({ _id: userId }).then((user) => {
                    if (user) {
                        req.user = user;
                        next();
                    } else {
                        return errorResponse(res, "Unauthorized access", 401);
                    }
                })
            }
        } catch (err) {
            if (err.name === "TokenExpiredError") {
                return errorResponse(res, "Unauthorized access", 401);
            }
            return errorResponse(res, "Invalid access token", 400);
        }
    } else {
        return errorResponse(res, "Access token is missing", 400);
    }
}