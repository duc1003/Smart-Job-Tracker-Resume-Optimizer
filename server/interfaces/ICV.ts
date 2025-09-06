import { Document, Types } from 'mongoose';

export interface ICV extends Document {
  userId: Types.ObjectId;
  name: string;
  content: string;
  filePath?: string;
  googleDriveFileId?: string;
  lastOptimizedForJobId?: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
