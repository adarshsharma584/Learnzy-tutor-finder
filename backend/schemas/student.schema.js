import { isNonEmptyString, toTrimmedString } from "./common.schema.js";

const validateRegisterStudentBody = (payload = {}) => {
  const errors = [];
  const value = {
    schoolName: toTrimmedString(payload.schoolName) || "",
    enrollmentNumber: toTrimmedString(payload.enrollmentNumber),
    currentClass: toTrimmedString(payload.currentClass) || "",
    board: toTrimmedString(payload.board) || "",
    medium: toTrimmedString(payload.medium) || "",
  };

  if (value.enrollmentNumber && !isNonEmptyString(value.enrollmentNumber)) {
    errors.push("enrollmentNumber must be a valid string");
  }

  return { value, errors };
};

export { validateRegisterStudentBody };
