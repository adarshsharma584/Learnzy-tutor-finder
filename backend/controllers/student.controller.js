import {Student} from "../models/student.model.js";

const registerStudent = async (req, res) => {
    try {
        const { fullName, schoolName, enrollmentNumber, currentClass, previousClass, parents, batches } = req.body;

        if (!fullName || !enrollmentNumber || !schoolName || !currentClass || !previousClass || !parents || !batches) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newStudent = await Student.create({

            fullName,
            schoolName,
            enrollmentNumber,
            currentClass,
            previousClass,
            parents,
            batches
        });

        return res.status(201).json({ message: "Student registered successfully", student: newStudent });
    } catch (error) {
        
    }
};

export {registerStudent};