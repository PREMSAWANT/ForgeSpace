import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
  action: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workspace',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Index for faster queries
ActivitySchema.index({ workspaceId: 1, timestamp: -1 });
ActivitySchema.index({ projectId: 1, timestamp: -1 });

export default mongoose.models.Activity || mongoose.model('Activity', ActivitySchema);
