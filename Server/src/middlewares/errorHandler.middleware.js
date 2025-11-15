import { ZodError } from "zod";

const formatZodErrors = (zodError) => {
  return zodError.issues.map((issue) => ({
    field: issue.path.join("."),
    message: issue.message
  }));
};

const errorHandler = (err, _req, res, _next) => {
  try {

    if (err instanceof ZodError) {
      return res.status(400).json({
        statusCode: 400,
        success: false,
        message: "Validation failed",
        errors: formatZodErrors(err)
      });
    }

    const statusCode = err.statusCode || 500
    const message = err.message || "Internal server error"
  
    console.error({
      message: message,
      error:  err.errors
    })
  
    return res.status(statusCode).json({
      statusCode: statusCode,
      data: err.errors || null,
      message,
      success: false,
    })

  } catch (error) {

    console.error("\nERROR: ", error)

    return res.status(500).json({
      statusCode: 500,
      message: "Internal server error",
      success:  false
    })
  }
}

export { errorHandler }