 import {Batch} from "../models/batch.model.js";

const createBatch = async (req, res) => {
    try {
        const { name, subjects, teachersId, time, fee, totalSeats } = req.body;
        const { tuitionId } = req.params;
       
        if (!name || !subjects || !teachersId || !time || !fee || !totalSeats) {
            return res.status(400).json({ message: "All fields are required" });
        };
        if(!tuitionId){
            return res.status(400).json({ message: "Tuition Center ID is required" });
        };

        const newBatch = await Batch.create({
            tuitionId,
            name,
            subjects,
            teachersId,  
            time,
            fee,
            totalSeats,
        });
  
        const populatedBatch = await Batch.findById(newBatch._id).populate('tuitionId').populate('teachersId');
       
        return res.status(201).json({ message: "Batch created successfully", batch: populatedBatch });
    } catch (error) {
         console.log("Error in creating batch:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export {createBatch};