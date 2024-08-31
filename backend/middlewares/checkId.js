import asyncHandler from "../middlewares/asyncHandler.js";

const checkUserId = asyncHandler(async (req, res, next) => {
  const userIdFromToken = req.user._id.toString(); // UserID extracted from the token
  const userIdFromParams = req.params.id; // UserID from the request parameters

  if (userIdFromToken !== userIdFromParams) {
    res.status(403);
    throw new Error("Access denied ya bro. You are not authorized to access this resource.");
  }

  next();
});

export default checkUserId;