const jwt = require("jsonwebtoken");

exports.generateToken = (token) => {
    const jwtPayload = { user_token: token };
    const jwtSecretKey = process.env.JWT_SECRET_KEY;
    const jwtOptions = { expiresIn: process.env.JWT_EXPIRE_TIME };

    const generatedJWTToken = jwt.sign(jwtPayload, jwtSecretKey, jwtOptions);

    return generatedJWTToken;
}

exports.validationMessages = (params, type, fieldName) => {
    let errorMessages = {};

    params.forEach((key) => {
        switch (key) {
            case "required":
                errorMessages[`any.${key}`] = `${fieldName} is required field`;
                break;
            case "empty":
                errorMessages[`${type}.${key}`] = `${fieldName} must contain value`;
                break;
            case "email":
                errorMessages[`string.${key}`] = `Please enter valid email address`;
                break;
            case "base":
                if (type === "number") {
                    errorMessages[`${type}.${key}`] = `${fieldName} must be a number`;
                }
                break;
        }
    });

    return errorMessages;
}