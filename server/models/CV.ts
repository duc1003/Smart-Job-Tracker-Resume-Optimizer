import { Schema, model } from 'mongoose';
import { ICV } from '../types/cv';

const CVSchema = new Schema<ICV>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true, trim: true },
  content: { type: String, required: true },
  filePath: { type: String },
  googleDriveFileId: { type: String },
  lastOptimizedForJobId: { type: Schema.Types.ObjectId, ref: 'Job' },
}, { timestamps: true });

export const CV = model<ICV>('CV', CVSchema);