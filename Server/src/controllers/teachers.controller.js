import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import Teacher from "../models/teacher.model.js";

const createTeacher = asyncHandler(async (req, res) => {
  const user = req?.user
  if( user?.role != "teacher" ) throw new ApiError(422, "User must be a teacher")

  const { experience, subjects, qualifications, bio } = req.body

  if(!experience || !subjects || !qualifications) throw new ApiError(422, "All feilds are required")

  const existing = await Teacher.findOne({ userId: req.user._id });
  if (existing) throw new ApiError(409, "Profile already exists");

  const teacher = await Teacher.create({
    userId: req.user._id,
    subjects,
    experience,
    qualifications,
    bio
  });

  res.status(201).json({
    success: true,
    message: "Teacher profile created successfully",
    data: teacher,
  });
});

const getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate("userId", "name email phone profilePhoto");
  if (!teacher) throw new ApiError(404, "Teacher not found");

  res.status(200).json({
    success: true,
    data: teacher,
    message: "Teacher fetched successfully"
  });
});

const updateTeacher = asyncHandler(async (req, res) => {
  const user = req.user
  if(user.role != "teacher") throw new ApiError(422, "User must be a teacher")

  const teacher = await Teacher.findOneAndUpdate(
    { userId: req.user._id },
    req.body,
    { new: true }
  );

  if (!teacher) throw new ApiError(404, "Teacher not found");

  res.status(200).json({
    success: true,
    message: "Teacher profile updated successfully",
    data: teacher,
  });
});

const getAllTeachers = asyncHandler(async (req, res) => {
  const { subject, board, className } = req.query;

  const filter = {};
  if (subject) filter["subjects.name"] = subject;
  if (board) filter["subjects.boards"] = board;
  if (className) filter["subjects.class"] = className;

  const teachers = await Teacher.find(filter).populate("userId", "name email profilePhoto");

  res.status(200).json({
    success: true,
    count: teachers.length,
    data: teachers,
  });
});

export {
  createTeacher,
  getTeacherById,
  getAllTeachers,
  updateTeacher
}