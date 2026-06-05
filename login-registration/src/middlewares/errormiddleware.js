const errorMiddleware = (err ,req, res, next) => {
    console.error(err.stack)
    return res.status(500).json({ status: 'error', message: 'Something broke!', data: null });
}

module.exports = errorMiddleware