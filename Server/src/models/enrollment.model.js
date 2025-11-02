import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema(
  {
    batch_id: {
      type: Schema.Types.ObjectId,
      ref: "Batch",
      required: true,
      index: true,
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    tuition_id: {
      type: Schema.Types.ObjectId,
      ref: "Tuition",
      index: true,
    },
    enrolled_at: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["active", "completed", "cancelled", "waitlisted"],
      default: "active",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate enrollment in the same batch
enrollmentSchema.index({ student_id: 1, batch_id: 1 }, { unique: true });

export default mongoose.model("Enrollment", enrollmentSchema);
