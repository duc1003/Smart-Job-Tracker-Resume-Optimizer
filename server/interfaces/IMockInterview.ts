import { Document, Types } from 'mongoose';

export interface IMockInterview extends Document {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  cvId: Types.ObjectId;
  startTime: Date;
  endTime?: Date;
  overallAiScore?: number;
  overallAiFeedback?: string;
  status: 'started' | 'in_progress' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}
