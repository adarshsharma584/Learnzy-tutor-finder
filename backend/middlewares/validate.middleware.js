import { AppError } from "../utils/appError.js";

const validateBody = (schemaValidator) => (req, _res, next) => {
  const { value, errors } = schemaValidator(req.body);
  if (errors.length > 0) {
    return next(new AppError("Validation failed", 400, errors));
  }

  req.body = value;
  return next();
};

const validateParams = (schemaValidator) => (req, _res, next) => {
  const { value, errors } = schemaValidator(req.params);
  if (errors.length > 0) {
    return next(new AppError("Validation failed", 400, errors));
  }

  req.params = value;
  return next();
};

export { validateBody, validateParams };
