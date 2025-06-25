const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        console.log('Attempting to connect with MONGO_URI:', mongoURI);
        if (!mongoURI) {
            console.error('Error: MONGO_URI is not defined in .env file.');
            process.exit(1);
        }
        const conn = await mongoose.connect(mongoURI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
