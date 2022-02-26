const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/UserModel");
const { successResponse, errorResponse } = require("../helpers/apiResponse");
const { generateToken } = require("../utils/common");

exports.login = (req, res) => {
    const { email, password } = req.body;

    UserModel.findOne({ email }).then((user) => {
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    const generatedJWTToken = generateToken(user._id.toString());
                    const responseData = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        token: generatedJWTToken
                    };

                    return successResponse(res, "Login successfully.", responseData);
                }
                else {
                    return errorResponse(res, "Invalid password", 400);
                }
            });
        } else {
            return errorResponse(res, "User does not exist", 404);
        }
    });
};

exports.logout = (req, res) => {
    jwt.verify(req.body.token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    })
};

exports.signup = (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    UserModel.findOne({ email }).then((user) => {
        if (user) {
            return errorResponse(res, "User already exists", 400);
        } else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    return errorResponse(res, "Something went wrong", 500);
                } else {
                    const userData = { firstName, lastName, email, password: hash };
                    UserModel.create(userData).then((user) => {
                        if (user) {
                            const responseData = {
                                firstName: user.firstName,
                                lastName: user.lastName,
                                email: user.email
                            }
                            return successResponse(res, "User added successfully.", responseData);
                        } else {
                            return errorResponse(res, "Something went wrong", 500);
                        }
                    }).catch((err) => {
                        return errorResponse(res, "Something went wrong", 500);
                    })
                }
            })
        }
    }).catch((err) => {
        return errorResponse(res, "Something went wrong", 500);
    })
};