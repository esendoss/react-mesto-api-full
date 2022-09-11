class UncorrectError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 400;
  }
}

module.exports = UncorrectError;
