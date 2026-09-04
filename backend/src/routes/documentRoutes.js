import express from 'express';
import  protect  from '../middleware/authMiddleware.js';
import upload from '../middleware/uploadMiddleware.js';

import { uploadDocument , getDocuments , getDocumentById, deleteDocument } from '../controllers/documentController.js';

const documentRoutes =express.Router();

documentRoutes.post('/upload',protect,upload.single('document'),uploadDocument);
documentRoutes.get('/getdocuments',protect,getDocuments);
documentRoutes.get('/document/:id',protect,getDocumentById);
documentRoutes.delete('/document/:id',protect,deleteDocument);


export default documentRoutes;
