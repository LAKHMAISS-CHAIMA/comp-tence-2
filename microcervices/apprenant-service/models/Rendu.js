import mongoose from "mongoose";

const renduSchema = new mongoose.Schema({
    apprenantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Apprenant', required: true },
    briefId: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: Number, min: 0, max: 20 },
    commentaire: { type: String, trim: true },
    dateSoumission: { type: Date, default: Date.now }
}, {
    timestamps: true
});

const Rendu = mongoose.model('Rendu', renduSchema);
export default Rendu;