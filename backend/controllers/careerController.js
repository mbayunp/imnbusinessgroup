import Career from '../models/Career.js';
const getCareers = async (req, res) => {
    try {
        const careers = await Career.find({}).sort({ postedDate: -1 });
        res.status(200).json(careers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
const getCareerById = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (career) {
            res.status(200).json(career);
        } else {
            res.status(404).json({ message: 'Career post not found' });
        }
    } catch (error) {
        console.error(error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Career ID format' });
        }
        res.status(500).json({ message: 'Server error' });
    }
};

const createCareer = async (req, res) => {
    const { title, description, gFormLink, imageUrl } = req.body;

    const createdBy = req.user._id;

    try {
        const career = new Career({
            title,
            description,
            gFormLink,
            imageUrl,
            createdBy
        });

        const createdCareer = await career.save();
        res.status(201).json(createdCareer);
    } catch (error) {
        console.error("Error creating career post:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Server error during career creation' });
    }
};

const updateCareer = async (req, res) => {
    const { title, description, gFormLink, imageUrl } = req.body;

    try {
        const career = await Career.findById(req.params.id);

        if (career) {
            career.title = title || career.title;
            career.description = description || career.description;
            career.gFormLink = gFormLink || career.gFormLink;
            career.imageUrl = imageUrl !== undefined ? imageUrl : career.imageUrl;
            
            const updatedCareer = await career.save();
            res.status(200).json(updatedCareer);
        } else {
            res.status(404).json({ message: 'Career post not found' });
        }
    } catch (error) {
        console.error("Error updating career post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Career ID format' });
        }
        res.status(500).json({ message: 'Server error during career update' });
    }
}
const deleteCareer = async (req, res) => {
    try {
        const career = await Career.findById(req.params.id);

        if (career) {
            await Career.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: 'Career post removed' });
        } else {
            res.status(404).json({ message: 'Career post not found' });
        }
    } catch (error) {
        console.error("Error deleting career post:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid Career ID format' });
        }
        res.status(500).json({ message: 'Server error during career deletion' });
    }
}
const getCareerStats = async (req, res) => {
    try {
        const totalCareers = await Career.countDocuments();
        const activeCareers = await Career.countDocuments({ /* status: 'active' */ });
        
        res.status(200).json({
            totalCareers,
            activeCareers
        });
    } catch (error) {
        console.error("Error fetching career stats:", error);
        res.status(500).json({ message: 'Server error fetching career stats' });
    }
};

export {
    getCareers,
    getCareerById,
    createCareer,
    updateCareer,
    deleteCareer,
    getCareerStats
};
