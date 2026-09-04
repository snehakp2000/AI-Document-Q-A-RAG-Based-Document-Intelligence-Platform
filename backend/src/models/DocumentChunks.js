import mongoose from "mongoose";

const documentChunkSchema = new mongoose.Schema(
    {
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
            index: true,
        },

        content: {
            type: String,
            required: true,
        },

        embedding: {
            type: [Number],
            required: true,
        },

        metadata: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
    }
);

const DocumentChunk = mongoose.model(
    "DocumentChunk",
    documentChunkSchema
);

export default DocumentChunk;