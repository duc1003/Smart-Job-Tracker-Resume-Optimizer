import { Schema, model } from 'mongoose';
import { IMockInterview, IMockInterviewQuestion } from '../types/mockInterview';

// Define the sub-schema for individual questions
const MockInterviewQuestionSchema = new Schema<IMockInterviewQuestion>({
  questionText: { type: String, required: true },
  aiGeneratedIdealAnswer: { type: String },
  userAnswer: { type: String },
  aiFeedback: { type: String },
  aiScore: { type: Number, min: 0, max: 100 },
}, { _id: false }); // No need for _id for sub-documents in an array

const MockInterviewSchema = new Schema<IMockInterview>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date },
  questions: [MockInterviewQuestionSchema], // Array of questions using the sub-schema
  overallAiScore: { type: Number, min: 0, max: 100 },
  overallAiFeedback: { type: String },
  status: { type: String, enum: ['started', 'in_progress', 'completed', 'canceled'], default: 'started' },
}, { timestamps: true });

export const MockInterview = model<IMockInterview>('MockInterview', MockInterviewSchema);