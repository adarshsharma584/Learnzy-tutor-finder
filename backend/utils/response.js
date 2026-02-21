const sendSuccess = (
  res,
  {
    statusCode = 200,
    message = "Success",
    data = null,
    meta = null,
    extras = {},
  } = {}
) => {
  const payload = {
    success: true,
    statusCode,
    message,
    ...extras,
  };

  if (data !== null) payload.data = data;
  if (meta !== null) payload.meta = meta;

  return res.status(statusCode).json(payload);
};

const sendError = (
  res,
  { statusCode = 500, message = "Internal Server Error", details = null } = {}
) => {
  const payload = {
    success: false,
    statusCode,
    message,
  };

  if (details !== null) payload.details = details;

  return res.status(statusCode).json(payload);
};

export { sendSuccess, sendError };
