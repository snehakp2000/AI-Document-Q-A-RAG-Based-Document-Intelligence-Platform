import Document from "../../models/Document.js";

import { loadDocument } from "../loaders/documentLoader.js";
import { splitDocuments } from "../splitters/textSplitter.js";
import { generateEmbeddings } from "../embeddings/embeddingService.js";
import { saveChunks } from "../../services/chunkStorageService.js";

export const processDocument = async (documentId) => {
    try {
        const document = await Document.findById(documentId);

        if (!document) {
            throw new Error("Document not found");
        }

        console.log(`Processing document: ${document.fileName}`);

        document.status = "processing";
        await document.save();

        // Load document
        const documents = await loadDocument(document.filePath);

        console.log(`Total Documents: ${documents.length}`);

        // Split into chunks
        const chunks = await splitDocuments(documents);

        console.log(`Total Chunks: ${chunks.length}`);

        // Generate embeddings
        const embeddings = await generateEmbeddings(chunks);

        console.log(`Total Embeddings: ${embeddings.length}`);

        // Save chunks and embeddings
        const savedChunks = await saveChunks(
            document._id,
            chunks,
            embeddings
        );

        console.log(`Saved Chunks: ${savedChunks.length}`);

        // Mark as processed
        document.status = "processed";
        await document.save();

        console.log("Document processing completed");

        return savedChunks;

    } catch (error) {
        console.error(
            "Document processing failed:",
            error.message
        );

        await Document.findByIdAndUpdate(documentId, {
            status: "failed"
        });

        throw error;
    }
};