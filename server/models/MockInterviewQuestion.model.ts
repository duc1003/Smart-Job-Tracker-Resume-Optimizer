import mongoose, { Schema, model } from 'mongoose';
import { IMockInterviewQuestion } from '../interfaces/IMockInterviewQuestion';

const MockInterviewQuestionSchema = new Schema<IMockInterviewQuestion>(
  {
    mockInterviewId: { type: Schema.Types.ObjectId, ref: 'MockInterview', required: true },
    questionText: { type: String, required: true },
    aiGeneratedIdealAnswer: { type: String },
    userAnswer: { type: String },
    aiFeedback: { type: String },
    aiScore: { type: Number, min: 0, max: 100 }
  },
  { timestamps: true }
);

export default model<IMockInterviewQuestion>('MockInterviewQuestion', MockInterviewQuestionSchema);
