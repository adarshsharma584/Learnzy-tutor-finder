import { TuitionCenter } from '../models/tuitionCenter.model.js';

const registerTuitionCenter = async (req, res) => {
    const { name, teachers, address, subjects, boards, medium, mode } = req.body;
    const userId = req.user._id;
    try {
        if (!name || !address || !subjects || !boards || !medium || !mode) {
            return res.status(400).json({ message: "All fields are required" });
        };

        const existedTuitionCenter = await TuitionCenter.findOne({ name: name.trim() });
        if (existedTuitionCenter) {
            return res.status(409).json({ message: "Tuition Center with this name already exists" });
        };

        const newTuitionCenter = await TuitionCenter.create({
            name,
            owner: userId,
            address,
            subjects,
            boards,
            medium,
            mode,
        });

        const populatedTuitionCenter = await TuitionCenter.findById(newTuitionCenter._id).populate('owner');
        console.log(populatedTuitionCenter);
        return res.status(201).json({ message: "Tuition Center registered successfully", tuitionCenter: populatedTuitionCenter });

    } catch (error) {
        console.log("Error in registering tuition center:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export { registerTuitionCenter };