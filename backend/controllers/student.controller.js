import { Student } from "../models/student.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeStudent } from "../serializers/student.serializer.js";

const registerStudent = asyncHandler(async (req, res) => {
  const { schoolName, enrollmentNumber, currentClass, board, medium } = req.body;
  const userId = req.user._id;

  if (req.user.role !== "student") {
    throw new AppError("Role must be student to create student profile", 403);
  }

  const existingStudent = await Student.findOne({ userId });
  if (existingStudent) {
    throw new AppError("Student profile already exists", 409);
  }

  const student = await Student.create({
    userId,
    schoolName,
    enrollmentNumber,
    currentClass,
    board,
    medium,
  });

  const populatedStudent = await Student.findById(student._id).populate("userId");

  return sendSuccess(res, {
    statusCode: 201,
    message: "Student profile created successfully",
    data: { student: serializeStudent(populatedStudent) },
  });
});

export { registerStudent };
