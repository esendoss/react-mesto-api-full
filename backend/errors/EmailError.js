class EmailError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 409;
  }
}

module.exports = EmailError;
