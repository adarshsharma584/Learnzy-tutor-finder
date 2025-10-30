import mongoose, { Schema } from "mongoose";

const teacherSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minLength: 3,
      maxLength: 50,
      index: true,
    },
    subjects: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
            boards: {
            type: [String],
            required: true,
            },
            class:{
            type: [String],
            required: true,
            }
      },
    ],
    qualifications: [
      {
        degree: {
          type: String,
          required: true,
          trim: true,
        },
        year: {
          type: Number,
          required: true,
        },
        document: {
          type: String, // URL to stored document
          required: true,
            },
        testGrades:{
            type:Number,
            required: true,
            
        }
      },
        ],
    
    experience: {
      type: Number,
      required: true,
      min: 0,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
      maxLength: 1000,
    },
   
   
    profilePicture: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
   
    
  },
  {
    timestamps: true,
  }
);


const Teacher = mongoose.model("Teacher", teacherSchema);

export default Teacher;
