import mongoose from 'mongoose';

const WorkspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a workspace name'],
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      role: {
        type: String,
        enum: ['owner', 'admin', 'member', 'viewer'],
        default: 'member',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Workspace || mongoose.model('Workspace', WorkspaceSchema);
