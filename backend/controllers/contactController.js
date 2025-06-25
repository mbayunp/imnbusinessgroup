import ContactMessage from '../models/ContactMessage.js';

const submitContactMessage = async (req, res) => {
    const { firstName, lastName, email, phone, subject, message } = req.body;

    try {
        const newMessage = new ContactMessage({
            firstName,
            lastName,
            email,
            phone,
            subject,
            message,
        });

        const createdMessage = await newMessage.save();

        res.status(201).json({
            message: 'Pesan Anda berhasil terkirim!',
            data: createdMessage
        });

    } catch (error) {
        console.error("Error submitting contact message:", error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ message: messages.join(', ') });
        }
        res.status(500).json({ message: 'Gagal mengirim pesan. Silakan coba lagi.' });
    }
};

import { protect } from '../middleware/authMiddleware.js'; 
import { authorizeRoles } from '../middleware/authorizeRoles.js';
const getAllContactMessages = async (req, res) => {
    try {
        const messages = await ContactMessage.find({}).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching contact messages:", error);
        res.status(500).json({ message: 'Server error fetching messages.' });
    }
}
const deleteContactMessage = async (req, res) => {
    try {
        const message = await ContactMessage.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Pesan tidak ditemukan.' });
        }

        await ContactMessage.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Pesan berhasil dihapus.' });

    } catch (error) {
        console.error("Error deleting contact message:", error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Format ID pesan tidak valid.' });
        }
        res.status(500).json({ message: 'Gagal menghapus pesan.' });
    }
};

export { submitContactMessage, getAllContactMessages, deleteContactMessage };