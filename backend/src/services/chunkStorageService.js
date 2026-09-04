import DocumentChunk from "../models/DocumentChunks.js";

export const saveChunks = async (documentId, chunks, embeddings) => {

    if (chunks.length !== embeddings.length) {
        throw new Error("Chunks and embeddings count do not match");
    }

    const chunkData = chunks.map((chunk, index) => ({
        documentId,
        content: chunk.pageContent,
        embedding: embeddings[index],
        metadata: chunk.metadata
    }));

    const savedChunks = await DocumentChunk.insertMany(chunkData);

    return savedChunks;
};