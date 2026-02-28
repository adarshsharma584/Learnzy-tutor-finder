import {
  isEmail,
  isObject,
  isPhone,
  isNonEmptyString,
  normalizePhone,
  toTrimmedString,
} from "./common.schema.js";

const allowedRoles = ["user", "student", "parent", "teacher", "admin"];

const validateRegisterBody = (payload = {}) => {
  const errors = [];
  const value = {
    fullName: toTrimmedString(payload.fullName),
    email: toTrimmedString(payload.email)?.toLowerCase(),
    password: payload.password,
    phone: normalizePhone(payload.phone),
    role: payload.role || "user",
    address: payload.address,
  };

  if (!isNonEmptyString(value.fullName)) {
    errors.push("fullName is required");
  } else if (value.fullName.length < 3) {
    errors.push("fullName must be at least 3 characters");
  }
  if (!isEmail(value.email)) {
    errors.push("email must be valid");
  }
  if (typeof value.password !== "string" || value.password.trim().length === 0) {
    errors.push("password is required");
  } else if (value.password.length < 6) {
    errors.push("password must be at least 6 characters");
  }
  if (!isPhone(value.phone)) {
    errors.push("phone must be 10 digits");
  }
  if (!allowedRoles.includes(value.role)) {
    errors.push("role is invalid");
  }
  if (!isObject(value.address)) {
    errors.push("address must be an object");
  }

  return { value, errors };
};

const validateLoginBody = (payload = {}) => {
  const errors = [];
  const value = {
    email: toTrimmedString(payload.email)?.toLowerCase(),
    password: payload.password,
  };

  if (!isEmail(value.email)) errors.push("email must be valid");
  if (typeof value.password !== "string" || value.password.trim().length === 0) {
    errors.push("password is required");
  } else if (value.password.length < 6) {
    errors.push("password must be at least 6 characters");
  }

  return { value, errors };
};

const validateVerifyOtpBody = (payload = {}) => {
  const errors = [];
  const value = {
    otp: toTrimmedString(payload.otp),
  };

  if (!/^\d{6}$/.test(value.otp || "")) {
    errors.push("otp must be a 6-digit code");
  }

  return { value, errors };
};

export { validateRegisterBody, validateLoginBody, validateVerifyOtpBody };
