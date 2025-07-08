import Apprenant from '../models/Apprenant.js';
import mongoose from 'mongoose';

const createApprenant = async (req, res) => {
    try {
        const apprenant = new Apprenant(req.body);
        await apprenant.save();
        res.status(201).json(apprenant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllApprenants = async (req, res) => {
    try {
        const apprenants = await Apprenant.find({});
        res.status(200).json(apprenants);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getApprenantById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const apprenant = await Apprenant.findById(id);
        if (!apprenant) {
            return res.status(404).json({ error: 'Apprenant non trouvé.' });
        }
        res.status(200).json(apprenant);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateApprenant = async (req, res) => {
    const { id } = req.params;
    const allowedUpdates = ['name', 'email'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Champs de mise à jour non autorisés.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const apprenant = await Apprenant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!apprenant) {
            return res.status(404).json({ error: 'Apprenant non trouvé.' });
        }
        res.status(200).json(apprenant);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteApprenant = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const apprenant = await Apprenant.findByIdAndDelete(id);
        if (!apprenant) {
            return res.status(404).json({ error: 'Apprenant non trouvé.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { createApprenant,getAllApprenants,getApprenantById,updateApprenant,deleteApprenant};
