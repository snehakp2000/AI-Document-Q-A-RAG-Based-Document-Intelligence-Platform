import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
});

export const generateAnswer = async (question, chunks) => {

    const context = chunks
        .map((chunk, index) => {
            return `Chunk ${index + 1}:\n${chunk.content}`;
        })
        .join("\n\n");

    const prompt = `
You are an AI assistant that answers questions based only on the provided document context.

Document Context:
${context}

Question:
${question}

Instructions:
- Answer using only the provided document context.
- Do not make up information.
- If the answer is not available in the context, say that the information is not available in the document.
- Keep the answer clear and concise.
`;

    const result = await model.generateContent(prompt);

    return result.response.text();
};