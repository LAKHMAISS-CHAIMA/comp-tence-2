import express from 'express';
import mongoose from 'mongoose';
import Rendu from '../models/Rendu.js';
import renduController from '../controllers/renduController.js';

const router = express.Router();

router.post('/rendus', renduController.createRendu);
router.get('/rendus', renduController.getAllRendus);
router.get('/rendus/:id', renduController.getRenduById);
router.patch('/rendus/:id', renduController.updateRendu);
router.delete('/rendus/:id', renduController.deleteRendu);

export default router;

