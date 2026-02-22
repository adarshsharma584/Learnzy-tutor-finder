import { Teacher } from "../models/teacher.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeTeacher } from "../serializers/teacher.serializer.js";

const registerTeacher = asyncHandler(async (req, res) => {
  const { subjects, experience, currentStatus, qualifications, isQualified } = req.body;
  const userId = req.user._id;

  if (req.user.role !== "teacher") {
    throw new AppError("Role must be teacher to create teacher profile", 403);
  }

  const existedTeacher = await Teacher.findOne({ userId });
  if (existedTeacher) {
    throw new AppError("Teacher profile already exists", 409);
  }

  const newTeacher = await Teacher.create({
    userId,
    subjects,
    experience,
    currentStatus,
    qualifications,
    isQualified,
  });

  const populatedTeacher = await Teacher.findById(newTeacher._id).populate("userId");
  return sendSuccess(res, {
    statusCode: 201,
    message: "Teacher profile created successfully",
    data: { teacher: serializeTeacher(populatedTeacher) },
  });
});

export { registerTeacher };
