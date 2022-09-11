class DeleteCardError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 403;
  }
}

module.exports = DeleteCardError;
