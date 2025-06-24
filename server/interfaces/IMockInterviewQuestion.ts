import { Document, Types } from 'mongoose';

export interface IMockInterviewQuestion extends Document {
  mockInterviewId: Types.ObjectId;
  questionText: string;
  aiGeneratedIdealAnswer?: string;
  userAnswer?: string;
  aiFeedback?: string;
  aiScore?: number;
  createdAt: Date;
  updatedAt: Date;
}
