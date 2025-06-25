import PressRelease from '../models/PressRelease.js';

const getPressReleases = async (req, res) => {
    try {
        const pressReleases = await PressRelease.find({}).sort({ postedDate: -1 });
        res.status(200).json(pressReleases);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getPressReleaseById = async (req, res) => {
    try {
        const pressRelease = await PressRelease.findById(req.params.id);

        if (pressRelease) {
            res.status(200).json(pressRelease);
        } else {
            res.status(404).json({ message: 'Press release post not found' });
        }
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Press Release ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};
const createPressRelease = async (req, res) => {
    const { title, content, imageUrl } = req.body;

    const createdBy = req.user._id;

    try {
        const pressRelease = new PressRelease({
            title,
            content,
            imageUrl,
            createdBy
        });

        const createdPressRelease = await pressRelease.save();
        res.status(201).json(createdPressRelease);
    } catch (error) {
        console.error("Error creating press release post:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error during press release creation' });
    }
};
const updatePressRelease = async (req, res) => {
    const { title, content, imageUrl } = req.body;

    try {
        const pressRelease = await PressRelease.findById(req.params.id);

        if (pressRelease) {
            pressRelease.title = title || pressRelease.title;
            pressRelease.content = content || pressRelease.content;
            pressRelease.imageUrl = imageUrl !== undefined ? imageUrl : pressRelease.imageUrl;
            const updatedPressRelease = await pressRelease.save();
            res.status(200).json(updatedPressRelease);
        } else {
            res.status(404).json({ message: 'Press release post not found' });
        }
    } catch (error) {
        console.error("Error updating press release post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Press Release ID format' });
        }
        res.status(500).json({ message: 'Server error during press release update' });
    }
};
const deletePressRelease = async (req, res) => {
    try {
        const pressRelease = await PressRelease.findById(req.params.id);

        if (pressRelease) {
            await PressRelease.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Press release post removed' });
        } else {
            res.status(404).json({ message: 'Press release post not found' });
        }
    } catch (error) {
        console.error("Error deleting press release post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Press Release ID format' });
        }
        res.status(500).json({ message: 'Server error during press release deletion' });
    }
}
const getPressReleaseStats = async (req, res) => {
    try {
        const totalPressReleases = await PressRelease.countDocuments();
        res.status(200).json({
            totalPressReleases
        });
    } catch (error) {
        console.error("Error fetching press release stats:", error);
        res.status(500).json({ message: 'Server error fetching press release stats' });
    }
};

export {
    getPressReleases,
    getPressReleaseById,
    createPressRelease,
    updatePressRelease,
    deletePressRelease,
    getPressReleaseStats
};
