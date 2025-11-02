import mongoose, { Schema } from "mongoose";

const tuitionSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    subject: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      grade: {
        type: String,
        required: true,
        trim: true,
      },
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        default: [0, 0],
      },
      address: String,
    },
    mode: {
      type: String,
      enum: ["offline", "online"],
      default: "offline"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
  }
);

tuitionSchema.index({ location: "2dsphere" });
tuitionSchema.index({ "subject.name": 1, "subject.grade": 1 });

const Tuition = mongoose.model("Tuition", tuitionSchema);

export default Tuition;
