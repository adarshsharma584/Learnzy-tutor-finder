import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { TavilySearch } from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createAgent } from "langchain";
import { InMemoryStore } from "@langchain/langgraph";



dotenv.config();

const model = new ChatGroq({
    model: "openai/gpt-oss-20b", // Using a high-capacity model for complex JSON
    temperature: 0.2, // Slightly above 0 for better variety in 25 questions
});


    


const checkpointer = new MemorySaver();


/**
 * BEST SYSTEM PROMPT FOR GENERATION
 * Note: We explicitly define the ID and the separation of Correct Answer.
 */
const SYSTEM_PROMPT = `You are an expert academic examiner. 
Your task is to generate 25 high-quality Multiple Choice Questions (MCQs) based on the provided Subject, Class, and Board.

WORKFLOW:
1. USE the given syllabus to generate the questions.
2. ANALYZE the syllabus to identify key chapters and topics.
3. GENERATE 25 MCQs based strictly on that researched syllabus.

STRICT JSON FORMAT:
Return ONLY a JSON array of objects. Each object MUST have:
1. "id": A unique string (e.g., "q_1").
2. "question": The question text.
3. "options": An array of 4 strings.
4. "correct_answer": "".


SYLLABUS RULES:
- Ensure questions match the current  syllabus for the specified Board.
- Distribute difficulty: 20% Easy, 50% Medium, 30% Hard.
- The Questions should test conceptual understanding and application.
- Avoid overly ambiguous questions.
- The questions should be designed to evaluate the capabilities of a genuine teacher.
- The questions can be of 1,2,3 or 4 lines.
- Add 2 or 3 tricky questions that test deep understanding.
- Ensure only one option is undeniably correct.`;


const agent = new createAgent({
    model: model,
    
    store: new InMemoryStore(),
    checkpointer: checkpointer,
    systemPrompt: SYSTEM_PROMPT,
});

export const generateQuestions = async (subject, studentClass, board) => {
    
    //1. call the tool
    // const syllabus = await tavilySearch(` find the latest Syllabus for ${subject} class ${studentClass} ${board} board`);
    
    // 2. Prepare the prompt with dynamic data
    const userInstruction =  `Subject: ${subject}, Class: ${studentClass}, Board: ${board}. 
    First search for the current syllabus, then generate the 25 MCQs in JSON.`;
    // 3. Call the model
    // We use .bind to force JSON mode if the model supports it
    const response = await model.invoke([
        new SystemMessage(SYSTEM_PROMPT),
        new HumanMessage(userInstruction)
    ], {
        response_format: { type: "json_object" }
    });

    try {
        const quizData = JSON.parse(response.content);

        // --- LOGIC FOR YOUR DB AND FRONTEND ---

        // 1. Store 'quizData' (containing correct_index) in your Database.
        // const savedQuiz = await db.quizzes.create({ data: quizData });

        // 2. Prepare Frontend version (Remove the correct_index and explanation)
        const frontendQuestions = quizData.map(({ correct_index, explanation, ...rest }) => rest);
        const answersKey = quizData.map((q) => q.correct_answer);
        console.log("Answers:", answersKey);
        // return {
        //     fullData: quizData,         // Save this in DB
        //     frontendData: frontendQuestions // Send this to Tutor
        // };
        console.log("Full Quiz Data:", quizData);
        console.log("Frontend Quiz Data:", frontendQuestions);

    } catch (error) {
        console.error("Failed to parse AI JSON:", error);
        return null;
    }
};

// Example Usage:
// const quiz = await generateQuestions("Physics", "12th", "CBSE");
// console.log(quiz.frontendData);