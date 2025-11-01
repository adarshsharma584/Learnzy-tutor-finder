import mongoose, { Schema } from "mongoose";

const tuitionSchema = new Schema(
  {
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      }
    ],
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
    batch: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        recurringDays: [
          {
            type: String,
            enum: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ],
          },
        ],
        timeSlot: {
          startTime: {
            type: String,
            required: true,
          },
          endTime: {
            type: String,
            required: true,
          },
        },
      },
    ],


    sessions: [
      {
        date: {
          type: Date,
          required: true,
        },
        status: {
          type: String,
          enum: ["scheduled", "completed", "cancelled", "rescheduled"],
          default: "scheduled",
        },
        attendanceMarked: {
          type: Boolean,
          default: false,
        },
        notes: {
          type: String,
          trim: true,
        },
        homework: {
          description: {
            type: String,
            trim: true,
          },
          dueDate: Date,
          completed: {
            type: Boolean,
            default: false,
          },
        },

      },
    ],

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
    feedback:
    {
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: {
        type: String,
        trim: true,
      },
      givenAt: Date,
    },
    progressReports: [
      {
        date: {
          type: Date,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
        achievements: [String],
        areasOfImprovement: [String],
        score: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);



tuitionSchema.index({ location: "2dsphere" });
tuitionSchema.index({ "subject.name": 1, "subject.grade": 1 });

const Tuition = mongoose.model("Tuition", tuitionSchema);

export default Tuition;
