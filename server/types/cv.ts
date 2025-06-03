import { Document, Schema } from 'mongoose';

export interface ICV extends Document {
  userId: Schema.Types.ObjectId; // Reference to the User who owns this CV
  name: string; // User-defined name for the CV (e.g., "Software Engineer CV for Google")
  content: string; // The full text content of the CV (can be raw text or JSON if structured)
  filePath?: string; // URL or path to the CV file in Google Drive/storage
  googleDriveFileId?: string; // ID if stored in Google Drive
  lastOptimizedForJobId?: Schema.Types.ObjectId; // Optional: reference to the Job it was last optimized against
  createdAt: Date;
  updatedAt: Date;
}