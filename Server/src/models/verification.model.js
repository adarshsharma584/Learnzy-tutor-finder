import mongoose, { Schema } from mongoose;

const verificationSchema = new Schema(
    {
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        classLevel: {
            type: String,

        },
        subject: {
            type: String,
            required: true,
        },
        board:
        {
            type: String
        },

        testContent: {
            type: String
        },
        testDate: {
            type: Date,
            default: Date.now
        },
        result: {
            score: String,
            percentage: String,
            remarks: String,
        },
        status:
        {
            type: String,
            enum: ["Pending", "Verified", "Rejected"], default: "Pending"
        },

    },
    {
        timestamps: true,
    }
);

const Verification = mongoose.model("Verification", verificationSchema);