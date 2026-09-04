import DocumentChunk from "../../models/DocumentChunks.js";

export const searchSimilarChunks = async (
    queryEmbedding,
    documentId,
    limit = 3
) => {
    const results = await DocumentChunk.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: queryEmbedding,
                numCandidates: 10,
                limit: limit,
                filter: {
                    documentId: documentId
                }
            }
        },
        {
            $project: {
                _id: 1,
                documentId: 1,
                content: 1,
                metadata: 1,
                score: {
                    $meta: "vectorSearchScore"
                }
            }
        }
    ]);

    return results;
};