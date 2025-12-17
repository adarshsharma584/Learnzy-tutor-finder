import { asyncHandler } from  "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { generateVerificationCode } from "../utils/helpers.js";
import { sendVerificationEmail, SendResetPasswordInstruction } from "../services/emailService.js";
import crypto from "crypto"
import { uploadOnCloudinary } from  "../utils/cloudinary.js"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    user.refreshToken = refreshToken
    user.save({validateBeforeSave: false})

    return {accessToken, refreshToken}

  } catch (error) {
    throw new ApiError(500, "Something went wrong, while generating access and refresh token!")
  }
}

const options = {
  httpOnly: true,
  secure: true
}

const registerUser = asyncHandler( async (req, res) => {
  const { name, email, password, phone, role } = req.body
  const  profilePhotoPath  = req?.file?.path

  if(!name || !email || !password || !phone){
    throw new ApiError(400, "All field are required")
  }

  const existedUser = await User.findOne({email})

  if(existedUser){
    throw new ApiError(409, "User with this email has already an account")
  }

  const profilePhoto = await uploadOnCloudinary(profilePhotoPath)

  const verificationCode = generateVerificationCode();
  
  const verificationCodeExpires = new Date(Date.now() + 10*60*1000)

  const user = await User.create({
    name, 
    email, 
    password, 
    phone, 
    role,
    profilePhoto: profilePhoto?.url,
    verificationCode,
    verificationCodeExpires
  })

  const createdUser = await User.findById(user._id).select("-refresh_token -password -verificationCode -verificationCodeExpires")

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering user");
  }

  await sendVerificationEmail(user.email, user?.name || "User",  verificationCode);

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: { createdUser },
    message: "User registered successfully. Check email for verification code."
  });
})

const verifyUser = asyncHandler( async (req, res) => {
  const { email, verificationCode } = req.body

  if ( !email || !verificationCode) throw new ApiError(400, "Email and code are required");

  const user = await User.findOne({email: email}).select(
    "+verificationCode +verificationCodeExpires"
  );

  if (!user) throw new ApiError(404, "User not found");

  if (user.isVerified) throw new ApiError(409, "User already verified");

  if (user.verificationCode !== verificationCode) throw new ApiError(400, "Invalid verification code");

  if (user.verificationCodeExpires < new Date()) throw new ApiError(400, "Verification code expired");

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      $set: { isVerified: true },
      $unset: { verificationCode: "", verificationCodeExpires: "" },
    },
    { new: true }
  );

  if(!updatedUser) throw new ApiError(500, "Something went wrong, user not verified")

  return res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User Verified successfully"
  });

})

const loginUser = asyncHandler( async (req, res) => {

  const { email, password } = req.body

  if(!email){
    throw new  ApiError(400, "Email must be required")
  }

  const user = await User.findOne({email})

  if(!user) throw new ApiError(404, "user not found");

  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if(!isPasswordCorrect) throw new ApiError(401, "Invalid email or password")
    
  if(!user.isVerified) throw new ApiError(403, "Please verify your email before logging in.");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

  return  res.status(200)
  .cookie("refreshToken", refreshToken, options)
  .json({
    success: true,
    statusCode: 200,
    accessToken: accessToken,
    message: "User logged in successfully"
  });
})

const logoutUser = asyncHandler( async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  res.status(200)
  .clearCookie("refreshToken", options)
  .json({
    success: true,
    statusCode:  200,
    message: "User logged out successfully"
  });
})

const getCurrentUser = asyncHandler( async (req, res) => {
  res.status(200)
  .json({
    success: true,
    statusCode:  200,
    data: req.user,
    message: "User fetched successfully"
  })
})

const updateUser = asyncHandler( async (req, res) => {
  const { name, email, phone, role } =  req.body

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
      phone,
      role
    },
    { new: true}
  );

  if(!user) throw new ApiError(500, "Something went wrong, while updating user");

  res.status(200).json({
    success: true,
    statusCode: 200,
    data: user,
    message: "User details updated successfully"
  })
})

const forgotPassword = asyncHandler( async  (req, res) => {
  const { email } = req.body

  if(!email) throw new ApiError(400, "Email must be required");

  const user = await User.findOne({email})

  if(!user) throw new ApiError(404, "User with this email not exist");

  const resetPasswordToken = crypto.randomBytes(16).toString("hex")
  const hashedToken  = crypto.createHash("sha256").update(resetPasswordToken).digest("hex")

  if(!resetPasswordToken || !hashedToken){
    throw new ApiError(500, "An error occured, Please try again later")
  }

  user.resetPasswordToken = hashedToken
  user.resetPasswordExpires = Date.now() + 60*60*1000
  await user.save();
  
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetPasswordToken}`

  console.log(resetPasswordUrl)
  await SendResetPasswordInstruction(user.email, resetPasswordUrl)

  res.status(200)
  .json({
    success: true,
    statusCode: 200,
    message:  "Reset password instructions sent successfully"
  })
})

const resetPassword = asyncHandler( async (req, res) => {
  const { resetPasswordToken, password } = req.body

  if(!resetPasswordToken || !password){
    throw new ApiError(400, "Reset password token and password are required")
  }

  const hashedToken = crypto.createHash("sha256").update(resetPasswordToken).digest("hex")

  if(!hashedToken) {
    throw new ApiError(500, "Failed to generate Reset Password Token, please try again");
  } 

  const  user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
  })

  if(!user) {
    throw new ApiError(400, "Invalid or Expired token")
  }

  user.password = password
  user.resetPasswordToken = undefined
  user.resetPasswordExpires = undefined
  await user.save(); // To trigger pre hook and hash password

  res.status(200)
  .json({
    success: true,
    statusCode: 200,
    message: "Password changed successfully"
  })
})

const deleteUser = asyncHandler( async (req, res) => {
  const user = await User.findByIdAndDelete(req.user._id)

  if(!user) {
    throw new ApiError(404, "User not found")
  }

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: "User deleted successfully"
  })
})

export {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUser,
  forgotPassword,
  resetPassword,
  deleteUser
}