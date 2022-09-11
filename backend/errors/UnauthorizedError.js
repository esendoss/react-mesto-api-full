class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
