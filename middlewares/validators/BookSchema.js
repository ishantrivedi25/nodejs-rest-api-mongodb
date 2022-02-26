const Joi = require("joi");

const { errorResponse } = require("../../helpers/apiResponse");
const { validationMessages } = require("../../utils/common");

exports.addBookValidator = (req, res, next) => {
    const schema = Joi.object({
        isbn: Joi.number().required()
            .messages(validationMessages(["required", "empty", "base"], "number", "ISBN")),
        title: Joi.string().trim().required()
            .messages(validationMessages(["required", "empty"], "string", "Title")),
        author: Joi.string().trim().required()
            .messages(validationMessages(["required", "empty"], "string", "Author")),
        description: Joi.string().trim()
            .messages(validationMessages(["empty"], "string", "Description")),
        published: Joi.date().required()
            .messages(validationMessages(["required", "empty"], "date", "Published")),
    })

    req.validationError = schema.validate(req.body).error //Get validation errors 
    req.body = schema.validate(req.body).value //Sanitize Request Body

    if (req.validationError?.name === "ValidationError") {
        return errorResponse(res, req.validationError.details[0].message, 400);
    } else {
        next();
    }
}

exports.updateBookValidator = (req, res, next) => {
    const schema = Joi.object({
        isbn: Joi.number().messages(validationMessages(["base", "empty"], "number", "ISBN")),
        title: Joi.string().trim().messages(validationMessages(["empty"], "string", "Title")),
        author: Joi.string().trim().messages(validationMessages(["empty"], "string", "Author")),
        description: Joi.string().trim().messages(validationMessages(["empty"], "string", "Description")),
        published: Joi.date().messages(validationMessages(["empty"], "date", "Published")),
    })

    req.validationError = schema.validate(req.body).error //Get validation errors 
    req.body = schema.validate(req.body).value //Get sanitized Request Body

    if (req.validationError?.name === "ValidationError") {
        return errorResponse(res, req.validationError.details[0].message, 400);
    } else {
        next();
    }
}