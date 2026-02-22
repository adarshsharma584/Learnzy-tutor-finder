import { TuitionCenter } from "../models/tuitionCenter.model.js";
import { Teacher } from "../models/teacher.model.js";
import { Address } from "../models/address.model.js";
import { AppError } from "../utils/appError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendSuccess } from "../utils/response.js";
import { serializeTuitionCenter } from "../serializers/tuition.serializer.js";

const normalizeAddressPayload = (address = {}) => ({
  streetAddress: address.streetAddress || address.houseNumber || "",
  city: address.city || "",
  state: address.state || "",
  country: address.country || "",
  pinCode: address.pinCode || "",
  lat: Number(address.lat ?? address.location?.latitude ?? 0),
  lng: Number(address.lng ?? address.long ?? address.location?.longitude ?? 0),
});

const registerTuitionCenter = asyncHandler(async (req, res) => {
  const { name, teachers, address, subjects, boards, medium, mode } = req.body;
  const userId = req.user._id;

  if (req.user.role !== "teacher") {
    throw new AppError("Role must be teacher to create tuition center", 403);
  }

  const teacherProfile = await Teacher.findOne({ userId });
  if (!teacherProfile) {
    throw new AppError("Teacher profile not found. Please complete teacher details first.", 400);
  }

  const existedTuitionCenter = await TuitionCenter.findOne({ owner: userId, name: name.trim() });
  if (existedTuitionCenter) {
    throw new AppError("You already have a tuition center with this name", 409);
  }

  const savedAddress =
    address && typeof address === "object" && !Array.isArray(address)
      ? await Address.create(normalizeAddressPayload(address))
      : address;

  const teacherIds = Array.isArray(teachers) ? teachers.map((item) => `${item}`) : [];
  teacherIds.push(`${teacherProfile._id}`);
  const uniqueTeacherIds = [...new Set(teacherIds)];

  const newTuitionCenter = await TuitionCenter.create({
    name,
    owner: userId,
    teachers: uniqueTeacherIds,
    address: savedAddress?._id || savedAddress,
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

const listMyTuitions = asyncHandler(async (req, res) => {
  if (req.user.role !== "teacher") {
    throw new AppError("Role must be teacher to list tuitions", 403);
  }

  const tuitions = await TuitionCenter.find({ owner: req.user._id })
    .sort({ createdAt: -1 })
    .populate("owner")
    .populate("teachers")
    .populate("address")
    .populate("batches");

  return sendSuccess(res, {
    statusCode: 200,
    message: "My tuitions fetched successfully",
    data: { tuitions: tuitions.map(serializeTuitionCenter) },
  });
});

const listAllTuitions = asyncHandler(async (_req, res) => {
  const tuitions = await TuitionCenter.find({})
    .sort({ createdAt: -1 })
    .populate("owner")
    .populate("teachers")
    .populate("address")
    .populate("batches");

  return sendSuccess(res, {
    statusCode: 200,
    message: "All tuitions fetched successfully",
    data: { tuitions: tuitions.map(serializeTuitionCenter) },
  });
});

const getTuitionById = asyncHandler(async (req, res) => {
  const { tuitionId } = req.params;
  const tuitionCenter = await TuitionCenter.findById(tuitionId)
    .populate("owner")
    .populate("teachers")
    .populate("address")
    .populate("batches");

  if (!tuitionCenter) throw new AppError("Tuition center not found", 404);

  return sendSuccess(res, {
    statusCode: 200,
    message: "Tuition center fetched successfully",
    data: { tuitionCenter: serializeTuitionCenter(tuitionCenter) },
  });
});

export { registerTuitionCenter, listMyTuitions, listAllTuitions, getTuitionById };
