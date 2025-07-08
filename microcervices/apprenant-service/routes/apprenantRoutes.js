import express from 'express';
import mongoose from 'mongoose';
import Apprenant from '../models/Apprenant.js';
import apprenantController from '../controllers/apprenantController.js';

const router = express.Router();

router.post('/apprenants', apprenantController.createApprenant);
router.get('/apprenants', apprenantController.getAllApprenants);
router.get('/apprenants/:id', apprenantController.getApprenantById);
router.patch('/apprenants/:id', apprenantController.updateApprenant);
router.delete('/apprenants/:id', apprenantController.deleteApprenant);

export default router;

