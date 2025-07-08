import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import connectDB from './config/db.js';
import apprenantRoutes from './routes/apprenantRoutes.js';
import renduRoutes from './routes/renduRoutes.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 9200;

connectDB();

app.use(express.json());
app.use(cors());

app.use('/', apprenantRoutes);
app.use('/', renduRoutes);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Quelque chose s\'est mal passé !' });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});


