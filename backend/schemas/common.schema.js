const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

const isNonEmptyString = (value) => typeof value === "string" && value.trim().length > 0;

const isEmail = (value) =>
  typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

const toTrimmedString = (value) => (typeof value === "string" ? value.trim() : value);

const normalizePhone = (value) => String(value ?? "").trim();

const isPhone = (value) => /^\d{10}$/.test(normalizePhone(value));

const isMongoObjectId = (value) => typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);

export {
  isObject,
  isNonEmptyString,
  isEmail,
  toTrimmedString,
  normalizePhone,
  isPhone,
  isMongoObjectId,
};
