import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },
    certificates: [
      {
        type: String,
        trim: true,
      },
    ],
    subjects: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    experience: {
      type: Number,
      default: 0,
      min: 0,
    },
    currentStatus: {
      type: String,
      enum: ["student", "working professional"],
    },
    isQualified: {
      type: Boolean,
      default: false,
    },
    isTestVerified: {
      type: Boolean,
      default: false,
    },
    testScore: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);
