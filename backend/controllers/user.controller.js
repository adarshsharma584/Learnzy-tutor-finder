import { User } from "../models/user.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeUser } from "../serializers/user.serializer.js";

const userProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .select("-password -refreshToken")
    .populate("address");

  if (!user) throw new AppError("Unauthorized user", 401);

  return sendSuccess(res, {
    statusCode: 200,
    message: "User profile fetched successfully",
    data: { user: serializeUser(user) },
  });
});

export { userProfile };
