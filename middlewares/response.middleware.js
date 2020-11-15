const responseMiddleware = (req, res, next) => {
   // TODO: Implement middleware that returns result of the query
//   res.status(res.data.status).json(res.data);
   res.status(res.data.status).send(res.data);
}

exports.responseMiddleware = responseMiddleware;