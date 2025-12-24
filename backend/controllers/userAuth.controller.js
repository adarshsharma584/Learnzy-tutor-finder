import { User } from "../models/user.model.js";
import { sendVerificationEmail,sendWelcomeEmail } from "../services/email.service.js";
import {Address} from "../models/address.model.js";



const generateAccessAndRefreshToken = async (user) => {
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const generateVeificationCode = () => {
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString()
    return verificationToken;
};

const registerUser = async (req, res) => {

    try {
        const { fullName, email, password, phone,address } = req.body;
        console.log(req.body);
        if (!fullName || !email || !password ||!phone ||!address) {
            return res.status(400).json({
                message: "All fields are required"
            });
        };

        const existedUser = await User.findOne({ email });
        if (existedUser) {
            return res.status(400).json({
                message: "user already exist",
            });
        };

        const userAddress = await Address.create(address);
        console.log(userAddress);
        
        const user = await User.create({
            fullName,
            email,
            password,
            phone,
            address: userAddress._id,
        });

        const otp = generateVeificationCode();
        await sendVerificationEmail(user.email, otp);
        user.verificationCode = otp;
        user.verificationCodeExpiry = Date.now() + 24 * 60 * 60 * 1000
        await user.save();

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
            user
        );




        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,

        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,

            secure: true,
        });
 
        const populatedUser = await User.find({
            email,
        }).select("-password -refreshToken").populate('address');
        

        return res.status(201).json({
            message: "User registered successfully.",
            user: populatedUser,
            accessToken,
            refreshToken,
        });

    } catch (error) {
        console.log("error in user register: ", error);
        return res.status(500).json("something went wrong while user registration!");
    }

};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        };

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "user not found",
            })
        };

        const isValidPassword = await user.comparePassword(password);
        if (!isValidPassword) {
            return res.status(400).json({
                message: "Invalid username or password",
            });
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: true,

        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,

            secure: true,
        });

        return res.status(201).json({
            message: "user logged in successfully.",
            user,
            accessToken,
            refreshToken,
        });
    } catch (error) {
        console.log("error in user login: ", error);
        return res.status(500).json({
            message: "Something went wrong while logging user",
        });
    }

};

const logoutUser = async (req, res) => {
    try {

        const userId = req.user._id;

        const existedUser = await User.findByIdAndUpdate(
            userId,
            {
                refreshToken: "",

            },
            {
                new: true,
            }
        );

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: true,
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: true,
        });

        return res.status(201).json({
            message: "user logged out successfully.",
        });
    } catch (error) {
        console.log("error in loggging out user: ", error);
        return res.status(500).json({
            message: "Something went wrong while logging out user!",
        });
    }
}

const verifyOTP = async (req, res) => {
    try {
        const { otp } = req.body;
        const id = req.user._id;
        console.log("otp:",otp);


        if (!otp) {
            return res.status(400).json({
                message: "otp code is missing",
            })
        };

        const user = await User.findOne(id).select("-password -refreshToken");
        console.log("user: ", user);
        if (!(user.verificationCode === `${otp}`)) {
            console.log("user verication code: ",user.verificationCode);
            return res.status(400).json({
                message:"otp does not match",
            })
        };

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpiry = undefined;
        await user.save();
        
        await sendWelcomeEmail(user.email, user.fullName)
        res.status(201).json({
            message: "Email Verified.",
            user,
        });

    } catch (error) {
        console.log("error while verifying email: ", error);
        return res.status(500).json({
            message: "something went wrong while verifying otp",
        })
    }
}




export { registerUser, loginUser, logoutUser,verifyOTP };
