import path from "path";

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";


export const loadDocument = async (filePath) => {

    const extension = path.extname(filePath).toLowerCase();

    let loader;

    switch (extension) {

        case ".pdf":
            loader = new PDFLoader(filePath);
            break;

        case ".docx":
            loader = new DocxLoader(filePath);
            break;

        default:
            throw new Error("Unsupported file type");
    }

    const documents = await loader.load();

    return documents;
};