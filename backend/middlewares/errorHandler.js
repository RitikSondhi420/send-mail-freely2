module.exports = (err, req, res, next) => {
    let status = err.statusCode || 500;
    let message = err.message || "something went wrong";
  
    console.error(err);
    res.status(status).send({ message });
    next();
  };
  