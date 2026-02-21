import { Student } from "../models/student.model.js";
import { User } from "../models/user.model.js";

const registerStudent = async (req, res) => {
  try {
    const { schoolName, enrollmentNumber, currentClass, previousClass } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!enrollmentNumber) {
      return res.status(400).json({ message: "enrollmentNumber is required" });
    }

    const existingStudent = await Student.findOne({ userId });
    if (existingStudent) {
      return res.status(409).json({ message: "Student profile already exists" });
    }

    const newStudent = await Student.create({
      userId,
      schoolName,
      enrollmentNumber,
      currentClass,
      previousClass,
    });

    await User.findByIdAndUpdate(userId, { $set: { role: "student" } }, { new: true });

    return res
      .status(201)
      .json({ message: "Student registered successfully", student: newStudent });
  } catch (error) {
    return res.status(500).json({ message: "Failed to register student", error: error.message });
  }
};

export { registerStudent };
