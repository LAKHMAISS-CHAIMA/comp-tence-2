import mongoose from "mongoose";

const renduSchema = new mongoose.Schema({
    apprenantId: { type: mongoose.SchemaType.Types.ObjectId, ref: 'Apprenant' },
    briefId: { type: String, required: true },
    description: { type: String, required: true },
    note: { type: Number, min: 0, max: 20 },
    commentaire: { type: String, trim: true },
    dateSoumission: Date
});
export default mongoose.model('Rendu', renduSchema)