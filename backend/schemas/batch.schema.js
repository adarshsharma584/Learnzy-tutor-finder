import { isMongoObjectId, isNonEmptyString, toTrimmedString } from "./common.schema.js";

const validateCreateBatchBody = (payload = {}) => {
  const errors = [];
  const value = {
    name: toTrimmedString(payload.name),
    subjects: Array.isArray(payload.subjects)
      ? payload.subjects.filter(isNonEmptyString).map((item) => item.trim())
      : [],
    teachersId: Array.isArray(payload.teachersId) ? payload.teachersId : [],
    start_time: toTrimmedString(payload.start_time),
    end_time: toTrimmedString(payload.end_time),
    fee: Number(payload.fee),
    totalSeats: Number(payload.totalSeats),
  };

  if (!isNonEmptyString(value.name)) errors.push("name is required");
  if (value.subjects.length === 0) errors.push("subjects must be a non-empty array");
  if (payload.teachersId !== undefined && !Array.isArray(payload.teachersId)) {
    errors.push("teachersId must be an array");
  }
  if (value.teachersId.some((id) => !isMongoObjectId(`${id}`))) {
    errors.push("teachersId must contain valid Mongo ObjectId values");
  }
  if (!isNonEmptyString(value.start_time)) errors.push("start_time is required");
  if (!isNonEmptyString(value.end_time)) errors.push("end_time is required");
  if (Number.isNaN(value.fee) || value.fee < 0) errors.push("fee must be a valid number");
  if (Number.isNaN(value.totalSeats) || value.totalSeats <= 0) {
    errors.push("totalSeats must be greater than 0");
  }

  return { value, errors };
};

const validateCreateBatchParams = (params = {}) => {
  const errors = [];
  const value = {
    tuitionId: params.tuitionId,
  };

  if (!isMongoObjectId(value.tuitionId)) {
    errors.push("tuitionId must be a valid Mongo ObjectId");
  }

  return { value, errors };
};

export { validateCreateBatchBody, validateCreateBatchParams };
