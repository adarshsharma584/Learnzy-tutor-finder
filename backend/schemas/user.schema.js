import { toTrimmedString } from "./common.schema.js";

const allowedUserRoles = ["user", "student", "parent", "teacher"];

const validateSetRoleBody = (payload = {}) => {
  const errors = [];
  const value = {
    role: toTrimmedString(payload.role),
  };

  if (!allowedUserRoles.includes(value.role)) {
    errors.push("role must be one of user, student, parent, teacher");
  }

  return { value, errors };
};

export { validateSetRoleBody, allowedUserRoles };
