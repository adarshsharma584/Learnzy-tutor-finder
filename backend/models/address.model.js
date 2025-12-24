import mongoose,{Schema} from "mongoose";

const addressSchema = new Schema(
    {
        houseNumber: {
            type: String,
        },
        streetNumber: {
            type: Number,
        },
        area: {
            type: String,
        },
        city: {
            type: String,
            
        },
        district: {
            type: String,
        },
        pinCode: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
           
        location: {
            latitude: {
                type: Number,
                default: 0,
                required: true,
            },
            longitude: {
                type: Number,
                default: 0,
                required: true,
            }
        },
    },
    {
        timestamps: true,
    }
);

export const Address = mongoose.model("Address", addressSchema);
            

           
