import { Teacher } from "../models/teacher.model.js";

const registerTeacher = async (req, res) => {
    try {
        const { subjects, experience, currentStatus, isQualified } = req.body;
        const userId = req.user._id;

        if (!subjects || !experience || !currentStatus || !isQualified) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const existedTeacher = await Teacher.findOne({ user: userId });
        if (existedTeacher) {
            return res.status(409).json({ message: "Teacher profile already exists" });
        };

        const newTeacher = await Teacher.create({
            userId,
            subjects,
            experience,
            currentStatus,
            isQualified,
        });
        newTeacher.userId?.role === "tutor";
        await newTeacher.userId.save();

        const populatedTeacher = await Teacher.findById(newTeacher._id).populate('userId');
            console.log(populatedTeacher);
        return res.status(201).json({ message: "Teacher profile created successfully", teacher:populatedTeacher });



    } catch (error) {
        console.log("Error in registering teacher:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export { registerTeacher };
