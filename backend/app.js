const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const careerRoutes = require('./routes/careerRoutes');
const pressReleaseRoutes = require('./routes/pressReleaseRoutes');

const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/auth', authRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/press-releases', pressReleaseRoutes);

app.use(notFound);

app.use(errorHandler);

module.exports = app;
