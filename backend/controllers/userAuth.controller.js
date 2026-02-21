import { User } from "../models/user.model.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../services/email.service.js";
import { Address } from "../models/address.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookie.js";
import { serializeUser } from "../serializers/user.serializer.js";

const generateAccessAndRefreshToken = async (user) => {
  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken };
};

const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

const normalizeAddressPayload = (address = {}) => ({
  streetAddress: address.streetAddress || address.houseNumber || "",
  city: address.city || "",
  state: address.state || "",
  country: address.country || "",
  pinCode: address.pinCode || "",
  lat: Number(address.lat ?? address.location?.latitude ?? 0),
  lng: Number(address.lng ?? address.long ?? address.location?.longitude ?? 0),
});

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password, phone, address, role } = req.body;

  const existedUser = await User.findOne({ email });
  if (existedUser) throw new AppError("User already exists", 409);

  const userAddress = await Address.create(normalizeAddressPayload(address));

  const user = await User.create({
    fullName,
    email,
    password,
    phone,
    role,
    address: userAddress._id,
  });

  const otp = generateVerificationCode();
  user.verificationCode = otp;
  user.verificationCodeExpiry = Date.now() + 24 * 60 * 60 * 1000;
  await user.save({ validateBeforeSave: false });

  await sendVerificationEmail(user.email, otp);

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  const populatedUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate("address");

  return sendSuccess(res, {
    statusCode: 201,
    message: "User registered successfully.",
    data: {
      user: serializeUser(populatedUser),
    },
    extras: { accessToken, refreshToken },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) throw new AppError("User not found", 404);

  const isValidPassword = await user.comparePassword(password);
  if (!isValidPassword) throw new AppError("Invalid username or password", 400);

  if (!user.isVerified) {
    throw new AppError("Please verify your email before logging in.", 403);
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user);
  setAuthCookies(res, accessToken, refreshToken);

  const safeUser = await User.findById(user._id)
    .select("-password -refreshToken")
    .populate("address");

  return sendSuccess(res, {
    statusCode: 200,
    message: "User logged in successfully.",
    data: {
      user: serializeUser(safeUser),
    },
    extras: { accessToken, refreshToken },
  });
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $set: { refreshToken: "" } }, { new: true });

  clearAuthCookies(res);
  return sendSuccess(res, {
    statusCode: 200,
    message: "User logged out successfully.",
  });
});

const verifyOTP = asyncHandler(async (req, res) => {
  const { otp } = req.body;
  const user = await User.findById(req.user._id).select("-password -refreshToken");

  if (!user) throw new AppError("User not found", 404);
  if (!user.verificationCode || !user.verificationCodeExpiry) {
    throw new AppError("Verification code not found", 400);
  }
  if (user.verificationCode !== `${otp}`) throw new AppError("OTP does not match", 400);
  if (user.verificationCodeExpiry < Date.now()) {
    throw new AppError("OTP expired. Please request a new code.", 400);
  }

  user.isVerified = true;
  user.verificationCode = undefined;
  user.verificationCodeExpiry = undefined;
  await user.save({ validateBeforeSave: false });

  await sendWelcomeEmail(user.email, user.fullName);

  return sendSuccess(res, {
    statusCode: 200,
    message: "Email Verified.",
    data: { user: serializeUser(user) },
  });
});

export { registerUser, loginUser, logoutUser, verifyOTP };
