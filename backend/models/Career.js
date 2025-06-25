import mongoose from 'mongoose';

const careerSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true
        },
        gFormLink: {
            type: String,
            required: true,
            trim: true,
            match: [/^(https?:\/\/(www\.)?(forms\.gle|docs\.google\.com\/forms)\/.+)$/i, 'Please use a valid Google Forms link']
        },
        imageUrl: {
            type: String,
            default: ''
        },
        postedDate: {
            type: Date,
            default: Date.now 
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Career', careerSchema);
