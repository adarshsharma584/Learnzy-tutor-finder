import { isNonEmptyString, isObject, toTrimmedString } from "./common.schema.js";

const validateRegisterTuitionBody = (payload = {}) => {
  const errors = [];
  const value = {
    name: toTrimmedString(payload.name),
    teachers: Array.isArray(payload.teachers) ? payload.teachers : [],
    address: payload.address,
    subjects: Array.isArray(payload.subjects)
      ? payload.subjects.filter(isNonEmptyString).map((item) => item.trim())
      : [],
    boards: Array.isArray(payload.boards)
      ? payload.boards.filter(isNonEmptyString).map((item) => item.trim())
      : [],
    medium: toTrimmedString(payload.medium),
    mode: toTrimmedString(payload.mode),
  };

  if (!isNonEmptyString(value.name)) errors.push("name is required");
  if (!isObject(value.address) && !isNonEmptyString(value.address)) {
    errors.push("address is required");
  }
  if (value.subjects.length === 0) errors.push("subjects must be a non-empty array");
  if (value.boards.length === 0) errors.push("boards must be a non-empty array");
  if (!isNonEmptyString(value.medium)) errors.push("medium is required");
  if (!["individual", "institue"].includes(value.mode || "")) {
    errors.push("mode must be one of: individual, institue");
  }

  return { value, errors };
};

export { validateRegisterTuitionBody };
