import mongoose from 'mongoose';

const pressReleaseSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        content: {
            type: String,
            required: true
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

export default mongoose.model('PressRelease', pressReleaseSchema);
