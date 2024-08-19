const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(res, req, next)).catch((error) => {
    res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;