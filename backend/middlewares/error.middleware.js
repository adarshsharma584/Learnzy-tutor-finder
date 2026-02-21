import { AppError } from "../utils/appError.js";
import { sendError } from "../utils/response.js";

const notFoundHandler = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

const errorHandler = (err, _req, res, _next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let details = err.details || null;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Validation error";
    details = Object.values(err.errors).map((item) => item.message);
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Duplicate field value";
    details = err.keyValue;
  }

  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Invalid or expired token";
  }

  return sendError(res, { statusCode, message, details });
};

export { notFoundHandler, errorHandler };
