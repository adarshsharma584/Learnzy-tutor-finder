import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        certificates: [
            {
                type: String,
                required: true,
                default: "",
            }
        ],
        subjects: [{
            type: String,
            required:true,
        }],
        experience: {
            type: Number,
            default: 0,
        },
        currentStatus: {
            type: String,
            enum: ['student', 'working professional']
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
        }
    },
    { timestamps: true }
);

export const Teacher = mongoose.model("Teacher", teacherSchema);