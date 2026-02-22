import mongoose, { Schema } from "mongoose";

const ownerModelByType = {
  student: "Student",
  teacher: "Teacher",
};

const documentSchema = new Schema(
  {
    owner_type: {
      type: String,
      enum: Object.keys(ownerModelByType),
      required: true,
      index: true,
    },
    owner_id: {
      type: Schema.Types.ObjectId,
      required: true,
      refPath: "owner_model",
      index: true,
    },
    owner_model: {
      type: String,
      enum: Object.values(ownerModelByType),
      required: true,
    },
    doc_type: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    file_url: {
      type: String,
      required: true,
      trim: true,
    },
    storage_key: {
      type: String,
      trim: true,
      default: "",
    },
    uploaded_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    verified: {
      type: Boolean,
      default: false,
      index: true,
    },
    verified_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    verified_at: {
      type: Date,
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

documentSchema.pre("validate", function (next) {
  this.owner_model = ownerModelByType[this.owner_type];
  next();
});

documentSchema.index({ owner_type: 1, owner_id: 1, doc_type: 1 });

export const Document = mongoose.model("Document", documentSchema);
