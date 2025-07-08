import Rendu from '../models/Rendu.js';
import mongoose from 'mongoose';

const createRendu = async (req, res) => {
    try {
        const rendu = new Rendu(req.body);
        await rendu.save();
        res.status(201).json(rendu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAllRendus = async (req, res) => {
    try {
        const rendus = await Rendu.find({});
        res.status(200).json(rendus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getRenduById = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const rendu = await Rendu.findById(id);
        if (!rendu) {
            return res.status(404).json({ error: 'Rendu non trouvé.' });
        }
        res.status(200).json(rendu);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRendu = async (req, res) => {
    const { id } = req.params;
    const allowedUpdates = ['apprenantId', 'briefId', 'description', 'note', 'commentaire', 'dateSoumission'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    if (!isValidOperation) {
        return res.status(400).json({ error: 'Champs de mise à jour non autorisés.' });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const rendu = await Rendu.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!rendu) {
            return res.status(404).json({ error: 'Rendu non trouvé.' });
        }
        res.status(200).json(rendu);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteRendu = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'ID invalide.' });
    }
    try {
        const rendu = await Rendu.findByIdAndDelete(id);
        if (!rendu) {
            return res.status(404).json({ error: 'Rendu non trouvé.' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default { createRendu, getAllRendus, getRenduById, updateRendu, deleteRendu};
