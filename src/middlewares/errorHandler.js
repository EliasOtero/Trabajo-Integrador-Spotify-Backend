function errorHandler(err, req, res, next) {
  console.error("Error capturado:", err);

  const status = err.status || 500;
  const payload = {
    success: false,
    error: {
      code: status,
      message: err.message || "Internal Server Error",
      ...(err.details && { details: err.details }),
    },
  };

  res.status(status).json(payload);
}

module.exports = { errorHandler };
