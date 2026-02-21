import mongoose, { Schema } from "mongoose";

const tuitionCenterSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        address: {
            type: Schema.Types.ObjectId,
            ref: "Address",
        },
        teachers: [
            {
                type: Schema.Types.ObjectId,
                ref: "Teacher",
            }
        ],
        ratings: {
            type: Number,
            default: 0,
        },
        subjects: [
            {
                type: String,
                required: true,
            }
        ],
        boards: [
            {
                type: String,

            }
        ],
        medium: {
            type: String,
        },
        mode: {
            type: String,
            enum: ["individual", "institue"],
            default: "individual",
        },
        batches: [
            {
                type: Schema.Types.ObjectId,
                ref: "Batch"
            }
        ],
        photos: [
            {
                type: String,
            }
        ],
        totalStudents: {
            type: Number,
            default: 0,
        },

    }, {
    timestamps: true,
}

);

export const TuitionCenter = mongoose.model("TuitionCenter", tuitionCenterSchema)
