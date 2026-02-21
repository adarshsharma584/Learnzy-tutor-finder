import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { extractAccessToken } from "../utils/token.js";

export const verifyJWT = asyncHandler(async (req, _res, next) => {
  const token = extractAccessToken(req);
  if (!token) throw new AppError("Unauthorized user", 401);

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?.id).select("-password -refreshToken");

  if (!user) throw new AppError("User not found", 401);

  req.user = user;
  next();
});
