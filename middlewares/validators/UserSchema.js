const Joi = require("joi");

const { errorResponse } = require("../../helpers/apiResponse");
const { validationMessages } = require("../../utils/common");


exports.signupValidator = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().required()
            .messages(validationMessages(["required", "empty"], "string", "FirstName")),
        lastName: Joi.string().trim()
            .messages(validationMessages(["empty"], "string", "LastName")),
        email: Joi.string().trim().email()
            .required().messages(validationMessages(["required", "empty", "email"], "string", "Email")),
        password: Joi.string().trim().required()
            .messages(validationMessages(["required", "empty"], "string", "Password"))
    })

    req.validationError = schema.validate(req.body).error //Get validation errors 
    req.body = schema.validate(req.body).value //Sanitize Request Body 

    if (req.validationError?.name === "ValidationError") {
        return errorResponse(res, req.validationError.details[0].message, 400);
    } else {
        next();
    }
}

exports.loginValidator = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().trim().email().required()
            .messages(validationMessages(["required", "empty", "email"], "string", "Email")),
        password: Joi.string().trim().required()
            .messages(validationMessages(["required", "empty"], "string", "Password"))
    })

    req.validationError = schema.validate(req.body).error //Get validation errors 
    req.body = schema.validate(req.body).value //Sanitize Request Body 

    if (req.validationError?.name === "ValidationError") {
        return errorResponse(res, req.validationError.details[0].message, 400);
    } else {
        next();
    }
}