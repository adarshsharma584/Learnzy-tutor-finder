import { Batch } from "../models/batch.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeBatch } from "../serializers/batch.serializer.js";

const createBatch = asyncHandler(async (req, res) => {
  const { name, subjects, teachersId, time, fee, totalSeats } = req.body;
  const { tuitionId } = req.params;

  const newBatch = await Batch.create({
    tuitionId,
    name,
    subjects,
    teachersId,
    time,
    fee,
    totalSeats,
    availableSeats: totalSeats,
  });

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
