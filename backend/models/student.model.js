import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    schoolName: {
      type: String,
      trim: true,
      default: "",
    },
    enrollmentNumber: {
      type: String,
      trim: true,
      default: "",
    },
    currentClass: {
      type: String,
      trim: true,
      default: "",
    },
    previousClass: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const Student = mongoose.model("Student", studentSchema);
