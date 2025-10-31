import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({ path: path.resolve(process.cwd(), '../../.env') });

if (!process.env.GEMINI_API_KEY) {
    console.error('GEMINI_API_KEY is not set in environment variables');
    process.exit(1);
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
    generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
    },
});

async function generateResponse(prompt) {
    try {
        const result = await model.generateContent([{ text: prompt }]);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}
async function main() {
    try {
        const response = await generateResponse("say hello with my name as Learnzy");
        console.log('Generated Response:', response);
    } catch (error) {
        console.error('Error in main:', error);
    }
}

export default generateResponse;

// Run the example if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main();
}


main();