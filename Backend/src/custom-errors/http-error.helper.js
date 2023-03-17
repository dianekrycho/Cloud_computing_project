const httpErrorHelper = (err, req, res, _next) => {
  console.error(err.stack);
  switch (err.name) {
    case "NotFoundError":
      return res.status(404).send(err.message);
    case "ValidationError":
    case "DuplicateError":
      return res.status(400).send(err.message);
    default:
      return res.status(500).send("Something broke!");
  }
};

module.exports = httpErrorHelper;
