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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    if (process.env.NODE_ENV !== 'test' && app._router && app._router.stack) {
        app._router.stack.forEach((r) => {
            if (r.route && r.route.path) {
                console.log(r.route.path, Object.keys(r.route.methods));
            }
        });
    }
});

export default app;


