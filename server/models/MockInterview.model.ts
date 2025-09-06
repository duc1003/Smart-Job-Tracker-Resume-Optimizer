import mongoose, { Schema, model } from 'mongoose';
import { IMockInterview } from '../interfaces/IMockInterview';

const MockInterviewSchema = new Schema<IMockInterview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date },
    overallAiScore: { type: Number, min: 0, max: 100 },
    overallAiFeedback: { type: String },
    status: {
      type: String,
      enum: ['started', 'in_progress', 'completed', 'canceled'],
      default: 'started'
    }
  },
  { timestamps: true }
);

export default model<IMockInterview>('MockInterview', MockInterviewSchema);
