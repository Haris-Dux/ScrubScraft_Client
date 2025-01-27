import express from 'express';
import { createSupport } from '../controllers/ContactController.js';

const contactRouter = express.Router();

contactRouter.post("/contact/createContact",createSupport);

export default contactRouter;

 

