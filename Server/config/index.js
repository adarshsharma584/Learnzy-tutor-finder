import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT || 4000,
    Mongo_URI: process.env.Mongo_URI
}