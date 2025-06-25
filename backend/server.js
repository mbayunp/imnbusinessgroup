import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/authRoutes.js';
import careerRoutes from './routes/careerRoutes.js';
import pressReleaseRoutes from './routes/pressReleaseRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import activityLogRoutes from './routes/activityLogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('✅ MongoDB connected successfully');
    })
    .catch(err => {
        console.error('❌ MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/press-releases', pressReleaseRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/activitylogs', activityLogRoutes);
app.use('/api/contact', contactRoutes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
    console.log(`🚀 Server is running on http://localhost:${port}`);
});
