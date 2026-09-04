import mongoose from "mongoose";
import { generateEmbeddings } from "../ai/embeddings/embeddingService.js";
import { searchSimilarChunks } from "../ai/retrieval/vectorSearchService.js";
import { generateAnswer } from "../ai/generation/answerService.js";

export const askQuestion = async (req, res) => {
    try {
        const { documentId, question } = req.body;

        // Validate input
        if (!documentId || !question) {
            return res.status(400).json({
                success: false,
                message: "Document ID and question are required."
            });
        }

        // Validate MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(documentId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid document ID."
            });
        }

        console.log("Question:", question);
        console.log("Document ID:", documentId);

        // Convert question into embedding
        const questionEmbeddingDocuments = await generateEmbeddings([
            {
                pageContent: question
            }
        ]);

        const queryEmbedding = questionEmbeddingDocuments[0];

        console.log(
            "Question embedding dimensions:",
            queryEmbedding.length
        );

        // Convert document ID to ObjectId
        const objectId = new mongoose.Types.ObjectId(documentId);

        // Retrieve relevant chunks
        const chunks = await searchSimilarChunks(
            queryEmbedding,
            objectId,
            3
        );

        console.log("Retrieved chunks:", chunks.length);

        if (chunks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No relevant information found in the document."
            });
        }

        // Generate answer using Gemini
        const answer = await generateAnswer(
            question,
            chunks
        );

        return res.status(200).json({
            success: true,
            question,
            answer,
            sources: chunks.map(chunk => ({
                chunkId: chunk._id,
                score: chunk.score,
                content: chunk.content
            }))
        });

    } catch (error) {
        console.error("Ask question error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};