import mongoose from "mongoose";

const apprenantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }
}, {
    timestamps: true
});

const Apprenant = mongoose.model('Apprenant', apprenantSchema);
export default Apprenant;