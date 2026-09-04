import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const generateEmbeddings = async (chunks) => {

    const embeddingModel = new GoogleGenerativeAIEmbeddings({
        apiKey: process.env.GEMINI_API_KEY,
        model: "gemini-embedding-001",
    });

    const texts = chunks.map(chunk => chunk.pageContent);

    const vectors = await embeddingModel.embedDocuments(texts);

    return vectors;
};