  module.exports = (req, res, next) => {
    const error = {
      status: 404,
      url: req.url,
      message: 'This URL doesnot exists'
    }
    next(error);
};