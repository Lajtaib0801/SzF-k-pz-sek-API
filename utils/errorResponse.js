class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
    }
}

const customError = (msg, statusCode) => {
    return new ErrorResponse(msg, statusCode)
}
module.exports = { ErrorResponse, customError }
