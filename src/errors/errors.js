/* Herencia de AppError a sub-errores */

class AppError extends Error {
  constructor(message, statusCode) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = statusCode
  }
}

class NotFoundError extends AppError {
  constructor(message = "Not found") {
    super(message, 404)
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403)
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409)
  }
}

class BadRequestError extends AppError {
  constructor(message = "Bad request") {
    super(message, 400)
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401)
  }
}

module.exports = {
  NotFoundError,
  ForbiddenError,
  ConflictError,
  BadRequestError,
  UnauthorizedError
}
