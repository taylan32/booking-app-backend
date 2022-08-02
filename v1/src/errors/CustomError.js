const CustomError = (message, status) => {
    const error = new Error()
    error.message = message
    error.status = status
    return error
}
module.exports = CustomError