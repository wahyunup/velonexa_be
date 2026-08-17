export const notFound = (req, res) => {
  res.status(404).json({ msg: "endpoint not found" });
};

export const errorHandler = (error, req, res, next) => {
  console.error(error);
  const status = error.statusCode || 500;
  res.status(status).json({ msg: status >= 500 ? "internal server error" : error.message });
};
