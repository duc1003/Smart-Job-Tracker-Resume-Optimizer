import { Document, Schema } from 'mongoose';

export interface IMockInterviewQuestion {
  questionText: string;
  aiGeneratedIdealAnswer?: string; // What the AI would consider a good answer
  userAnswer?: string; // The user's transcribed/typed answer
  aiFeedback?: string; // GPT-4's specific feedback on the user's answer
  aiScore?: number; // Score for this specific question (0-100)
}

export interface IMockInterview extends Document {
  userId: Schema.Types.ObjectId; // The user who took the interview
  jobId: Schema.Types.ObjectId; // The Job Description context for the interview
  cvId: Schema.Types.ObjectId; // The CV context for the interview
  startTime: Date;
  endTime?: Date; // When the interview concluded
  questions: IMockInterviewQuestion[]; // Array of interview questions and responses
  overallAiScore?: number; // Overall score for the entire interview (0-100)
  overallAiFeedback?: string; // Overall feedback from GPT-4
  status: 'started' | 'in_progress' | 'completed' | 'canceled';
  createdAt: Date;
  updatedAt: Date;
}