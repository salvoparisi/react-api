const notFoundMiddleware = (req, res, next) => {
    res.status(404).json({
        message: "Nessun elemento trovato"
    });
};

module.exports = notFoundMiddleware;