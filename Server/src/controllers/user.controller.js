import { asyncHandler } from  "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";

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

  if(!name || !email || !password || !phone){
    throw new ApiError(400, "All field are required")
  }

  const existedUser = await User.findOne({email})

  if(existedUser){
    throw new ApiError(409, "User with this email has already an account")
  }

  const user = await User.create({
    name, email, password, phone, role
  })

  const createdUser = await User.findById(user._id).select("-refresh_token")

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering user");
  }

  res.status(201).json({
    success: true,
    statusCode: 201,
    data: createdUser,
    message: "User registered successfully"
  });
})

const loginUser = asyncHandler( async (req, res) => {

  const { email, password } = req.body

  if(!email){
    throw new  ApiError(400, "Email must be required")
  }

  const user = await User.findOne({email})

  if(!user){
    throw new ApiError(404, "user not found")
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password)

  if(!isPasswordCorrect){
    throw new ApiError(401, "Invalid email or password")
  }

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


export {
  registerUser,
  loginUser,
  logoutUser
}