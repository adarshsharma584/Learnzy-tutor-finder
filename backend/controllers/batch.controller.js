import { Batch } from "../models/batch.model.js";
import { TuitionCenter } from "../models/tuitionCenter.model.js";
import { Teacher } from "../models/teacher.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeBatch } from "../serializers/batch.serializer.js";

const createBatch = asyncHandler(async (req, res) => {
  const { name, subjects, teachersId, start_time, end_time, fee, totalSeats } = req.body;
  const { tuitionId } = req.params;

  if (req.user.role !== "teacher") {
    throw new AppError("Role must be teacher to create batch", 403);
  }

  const tuition = await TuitionCenter.findById(tuitionId);
  if (!tuition) {
    throw new AppError("Tuition center not found", 404);
  }

  if (`${tuition.owner}` !== `${req.user._id}`) {
    throw new AppError("You can create batches only for your tuition centers", 403);
  }

  const teacherProfile = await Teacher.findOne({ userId: req.user._id });
  if (!teacherProfile) {
    throw new AppError("Teacher profile not found. Please complete teacher details first.", 400);
  }

  const batchTeacherIds = Array.isArray(teachersId) ? teachersId.map((item) => `${item}`) : [];
  batchTeacherIds.push(`${teacherProfile._id}`);
  const uniqueTeacherIds = [...new Set(batchTeacherIds)];

  const newBatch = await Batch.create({
    tuitionId,
    name,
    subjects,
    teachersId: uniqueTeacherIds,
    start_time,
    end_time,
    fee,
    totalSeats,
    availableSeats: totalSeats,
  });

  await TuitionCenter.findByIdAndUpdate(tuitionId, { $addToSet: { batches: newBatch._id } });

  const populatedBatch = await Batch.findById(newBatch._id)
    .populate("tuitionId")
    .populate("teachersId");

  return sendSuccess(res, {
    statusCode: 201,
    message: "Batch created successfully",
    data: { batch: serializeBatch(populatedBatch) },
  });
});

export { createBatch };
