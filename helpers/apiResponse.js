exports.successResponse = (res, message, data, statusCode = 200) => {
    const response = {
        status: 1,
        message: message,
        data: data
    };
    return res.status(statusCode).json(response);
}

exports.errorResponse = (res, message, statusCode) => {
    const response = {
        status: 0,
        message: message,
        data: {}
    };
    return res.status(statusCode).json(response);
}