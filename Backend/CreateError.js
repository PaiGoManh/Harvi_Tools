function CustomError(errorName, errorMessage, originalError) {
    Error.call(this, errorMessage);
    this.name = errorName;
    this.originalError = originalError || null;
    this.errors = [];
}

CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;

module.exports = CustomError;
