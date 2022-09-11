class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 404;
  }
}
module.exports = NotFoundError;
