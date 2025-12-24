import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    schoolName: {
        type: String,
    },
        
    enrollmentNumber: {
        type: Number,
        required: true,
        default: 0,
    },
    currentClass: {
        type: String,
    },
    previousClass: {
        type: String,
    },
        
    parents: [
        {
            type: Schema.Types.ObjectId,
            ref: "Parent",
        }
    ],
    batches: [
        {
            type: Schema.Types.ObjectId,
            ref: "Batch",
        }
    ],

        
}, {
    timestamps: true,
});

export const Student = mongoose.model("Student", studentSchema);
