import { asyncHandler } from  "../utils/asyncHandler.js"
import { ApiError } from  "../utils/apiError.js"
import Tuition from "../models/tuition.model.js"

const getAllTuitions = asyncHandler(async (_req, res) => {
  const tuitions = await Tuition.find()
    // .populate("teacher", "name email")
    .populate("students", "name email");

  res.status(200).json({
    success: true,
    count: tuitions.length,
    data: tuitions,
    message: "Tutions retrieved successfully"
  });
});

const createTution = asyncHandler(async (req, res) => {
  const { teacher, students, subject, batch, location } = req.body

  if (!teacher || !subject?.name || !subject?.grade || !batch?.length) {
    throw new ApiError(400, "Missing required fields");
  }

  const tuition = await Tuition.create({
    teacher,
    students,
    subject,
    batch,
    location
  })

  if(!tuition) throw  new ApiError(500, "Tution  not  created")

  res.status(201).json({
    success: true,
    message: "Tuition created successfully",
    data: tuition,
  })
})

const getTuitionById = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id)
    // .populate("teacher", "name email")

  if (!tuition) {
    throw new ApiError(404, "Tuition not found");
  }

  res.status(200).json({
    success: true,
    data: tuition,
  });
});

export {
  getAllTuitions,
  createTution,
  getTuitionById
}