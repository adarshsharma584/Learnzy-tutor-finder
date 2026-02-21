import { TuitionCenter } from '../models/tuitionCenter.model.js';
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeTuitionCenter } from "../serializers/tuition.serializer.js";

const registerTuitionCenter = asyncHandler(async (req, res) => {
  const { name, teachers, address, subjects, boards, medium, mode } = req.body;
  const userId = req.user._id;

  const existedTuitionCenter = await TuitionCenter.findOne({ name: name.trim() });
  if (existedTuitionCenter) {
    throw new AppError("Tuition Center with this name already exists", 409);
  }

  const newTuitionCenter = await TuitionCenter.create({
    name,
    owner: userId,
    teachers,
    address,
    subjects,
    boards,
    medium,
    mode,
  });

  const populatedTuitionCenter = await TuitionCenter.findById(newTuitionCenter._id)
    .populate("owner")
    .populate("teachers")
    .populate("address");

  return sendSuccess(res, {
    statusCode: 201,
    message: "Tuition Center registered successfully",
    data: { tuitionCenter: serializeTuitionCenter(populatedTuitionCenter) },
  });
});

export { registerTuitionCenter };