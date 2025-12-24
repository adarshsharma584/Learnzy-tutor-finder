import mongoose, { Schema } from "mongoose";

const parentSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        children: [{
            type: Schema.Types.ObjectId,
            ref: "Student",
           
        }
        ]
    }, {
    timestamps: true,
}
);

export const Parent = mongoose.model("Parent", parentSchema);