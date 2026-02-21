import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema(
  {
    streetAddress: {
      type: String,
      trim: true,
      default: "",
    },
    city: {
      type: String,
      trim: true,
      default: "",
    },
    pinCode: {
      type: String,
      trim: true,
      default: "",
    },
    state: {
      type: String,
      trim: true,
      default: "",
    },
    country: {
      type: String,
      trim: true,
      default: "",
    },
    lat: {
      type: Number,
      default: 0,
      required: true,
    },
    lng: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Address = mongoose.model("Address", addressSchema);
