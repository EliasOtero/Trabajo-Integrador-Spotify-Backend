function errorHandler(err, req, res, next) 
{
    console.error(err);
    const status =  err.status || 500;
    const payload =
    {
        error: 
        {
            code: status,
            message: err.message || "Internal Server Error",
            details: err.details || undefined
        }
    };
    res.status(status).json(payload);
}

module.exports = { errorHandler };