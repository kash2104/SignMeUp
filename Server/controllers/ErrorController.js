module.exports = (err, req, res, next) => {
    logger.error(err.stack);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }