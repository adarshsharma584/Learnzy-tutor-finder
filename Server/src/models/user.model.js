import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: true,
    trim: true,
    index: true
  },
  phone:  {
    type: String,
    maxlenght: 10
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    minlength: 6
  },
  role: {
    type: String,
    enum: ["student", "tutor", "parent"],
    default: "student"
  },
  refreshToken: {
    type: String
  },

  isVerified: {
    type: Boolean,
    default: false
  },
  verificationCode: {
    type: String
  },
  verificationCodeExpires: {
    type: Date
  },

  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }

}, { timestamps: true});

userSchema.pre("save", async function(next) {
  if(!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10)
  next()
});

userSchema.methods.isPasswordCorrect = async function(password) {
  return await bcrypt.compare(password, this.password);
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

export const User = mongoose.model("User", userSchema)