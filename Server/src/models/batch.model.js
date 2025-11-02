import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    tuition_id: {
      type: Schema.Types.ObjectId,
      ref: "Tuition",
      required: true,
      index: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      index: true,
    },
    start_date: {
      type: Date,
      required: true,
    },
    end_date: {
      type: Date,
    },
    start_time: {
      type: String, // e.g. "17:00"
      required: true,
    },
    end_time: {
      type: String, // e.g. "18:30"
      required: true,
    },
    days_of_week: {
      type: [String],
      enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      default: [],
    },
    max_students: {
      type: Number,
      default: 10,
      min: 1,
    },
    current_students: {
      type: Number,
      default: 0,
      min: 0,
    },
    fees: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual field: available seats
batchSchema.virtual("availableSeats").get(function () {
  return this.max_students - this.current_students;
});

export default mongoose.model("Batch", batchSchema);
