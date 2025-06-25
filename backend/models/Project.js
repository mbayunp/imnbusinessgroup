import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  link: String,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);
export default Project;
