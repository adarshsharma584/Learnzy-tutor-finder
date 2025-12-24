import { User } from "../models/user.model.js";


const userProfile = async (req, res) => {
    try {
        const id = req.user._id;

        
        const user = await User.findById(id).select(
            "-password -refreshToken"
        );

        if (!user) {
            res.status(400).json({
                message:"Unauthorized user",
            })
        }

        return res.status(200).json({
            message: "user profile fetched successfully",
            user,
        });

    } catch (error) {

        console.log("error while fetching user profile: ", error);
        return res.status(500).json({
            message:"Something went wrong while fetching user profile!",
        })
    }
}


export {userProfile}