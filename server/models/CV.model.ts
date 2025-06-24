import mongoose, { Schema, model } from 'mongoose';
import { ICV } from '../interfaces/ICV';

const CVSchema = new Schema<ICV>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    content: { type: String, required: true },
    filePath: { type: String },
    googleDriveFileId: { type: String },
    lastOptimizedForJobId: { type: Schema.Types.ObjectId, ref: 'Job' }
  },
  { timestamps: true }
);

export default model<ICV>('CV', CVSchema);
