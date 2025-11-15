import { asyncHandler } from  "../utils/asyncHandler.js"
import { ApiError } from  "../utils/apiError.js"
import Tuition from "../models/tuition.model.js"
import Batch from "../models/batch.model.js"

const getAllTuitions = asyncHandler(async (_req, res) => {
  const tuitions = await Tuition.find()
    .populate("teacher", "name email")
    // .populate("students", "name email");

  res.status(200).json({
    success: true,
    count: tuitions.length,
    data: tuitions,
    message: "Tuitions retrieved successfully"
  });
});

const createTuition = asyncHandler(async (req, res) => {
  const { teacher, subject, batch, location, title, description, mode } = req.body;

  if (!teacher || !subject?.name || !title) {
    throw new ApiError(422, "Missing required fields: teacher, subject name, subject grade, or title");
  }

  const tuition = await Tuition.create({
    teacher,
    subject,
    location,
    title,
    description,
    mode
  });

  if (!tuition) throw new ApiError(500, "Tuition not created");

  let createdBatches = [];
  if (Array.isArray(batch) && batch.length > 0) {
    const batchesToCreate = batch.map(b => ({
      tuition_id: tuition._id,
      name: b.name,
      start_date: b.start_date,
      end_date: b.end_date,
      start_time: b.start_time,
      end_time: b.end_time,
      days_of_week: b.days_of_week,
      max_students: b.max_students,
      fees: b.fees,
    }));

    createdBatches = await Batch.insertMany(batchesToCreate);
  }

  res.status(201).json({
    success: true,
    message: "Tuition created successfully",
    data: {
      tuition,
      batches: createdBatches,
    },
  });
});


const getTuitionById = asyncHandler(async (req, res) => {
  const tuition = await Tuition.findById(req.params.id)
    .populate({
      path: "teacher",
      populate: {
        path: "userId",
        select: "name email phone"
      }
    })

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
  createTuition,
  getTuitionById
}