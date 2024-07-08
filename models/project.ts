import mongoose, { Schema } from 'mongoose';

const projectSchema = new Schema(
  {
    title: String,
    summary: String,
    description: String,
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project;
