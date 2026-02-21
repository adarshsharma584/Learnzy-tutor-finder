import {
  isNonEmptyString,
  toTrimmedString,
} from "./common.schema.js";

const validateRegisterTeacherBody = (payload = {}) => {
  const errors = [];
  const value = {
    subjects: Array.isArray(payload.subjects)
      ? payload.subjects.filter(isNonEmptyString).map((item) => item.trim())
      : [],
    experience: Number(payload.experience),
    currentStatus: toTrimmedString(payload.currentStatus),
    isQualified: payload.isQualified,
  };

  if (value.subjects.length === 0) errors.push("subjects must be a non-empty array");
  if (Number.isNaN(value.experience) || value.experience < 0) {
    errors.push("experience must be a valid non-negative number");
  }
  if (!["student", "working professional"].includes(value.currentStatus)) {
    errors.push("currentStatus is invalid");
  }
  if (typeof value.isQualified !== "boolean") {
    errors.push("isQualified must be boolean");
  }

  return { value, errors };
};

export { validateRegisterTeacherBody };
