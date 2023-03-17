class DuplicateError extends Error {
  constructor(message) {
    super(message);
    this.name = "DuplicateError";
  }
}

module.exports.DuplicateError = DuplicateError;
