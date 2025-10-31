import generateResponse from '../services/gemini_service.js';


export const generateTestQuestions = async (req, res) => {
    const { classLevel, subject, board } = req.body;

    const prompt = `
    Generate a test with ${25} questions for 
    ${classLevel} students in ${subject},
    following the ${board} board curriculum.
    Include 4 options for each question and mark the correct answer.
    The Questions should contains the questions of intermediate and hard level.
    The test should contain the level of questions as they can be used to verify the capabalities of a genuine teacher.
    Format strictly as JSON:
    [
      { "question": "string", "options": ["A", "B", "C", "D"], "correctAnswer": "A" }
    ]
    `;

    try {
        const response = await generateResponse(prompt);
        console.log('Generated Test Questions Response:', response);
        // if the model returned an object/array already, return it
        if (Array.isArray(response) || typeof response === 'object') {
            return res.status(200).json(response);
        }

        return res.status(200).json({ rawResponse: response });

       
    } catch (error) {
        console.error('Error generating test questions:', error);
        return res.status(500).json({ error: error.message || 'Unknown error', details: error.sample || null });
    }
};


export const compareAnswers = async (req, res) => {
    const { tutorResponses } = req.body;
    const prompt = `
    Compare the following tutor responses to the standard answers.
    Provide a score out of 25 and feedback on the quality of the responses.
    Tutor Responses: ${JSON.stringify(tutorResponses)}
    `;
    try {
        const response = await generateResponse(prompt);
        console.log('Comparison Response:', response);
        return res.status(200).json({ evaluation: response });
    } catch (error) {
        console.error('Error comparing answers:', error);
        return res.status(500).json({ error: error.message || 'Unknown error', details: error.sample || null });
    }
};

