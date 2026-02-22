import mongoose, { Schema } from "mongoose";

const batchSchema = new Schema(
  {
    tuitionId: {
      type: Schema.Types.ObjectId,
      ref: "TuitionCenter",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    },
    Students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
    teachersId: [
      {
        type: Schema.Types.ObjectId,
        ref: "Teacher",
      },
    ],
    totalSeats: {
      type: Number,
      default: 0,
    },
    bookedSeats: {
      type: Number,
      default: 0,
    },
    availableSeats: {
      type: Number,
      default: 0,
    },
    subjects: [
      {
        type: String,
        required: true,
      },
    ],
    fee: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Batch = mongoose.model("Batch", batchSchema);
