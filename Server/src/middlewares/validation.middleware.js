import { ZodError } from "zod";

export const validate =(schema) =>
  (req, _res, next) => {
    try {
      const parsed = schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });

      req.body = parsed.body;
      req.validated = {
        query: parsed.query,
        params: parsed.params
      }

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        err.statusCode = 400;
        return next(err);
      }
      next(err);
    }
  };
