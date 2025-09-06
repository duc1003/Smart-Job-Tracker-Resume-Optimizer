import mongoose, { Schema, model } from 'mongoose';
import { IAiMatchReport } from '../interfaces/IAiMatchReport';

const AiMatchReportSchema = new Schema<IAiMatchReport>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true, unique: true },
    cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    reportDate: { type: Date, default: Date.now },
    matchScore: { type: Number, required: true, min: 0, max: 100 },
    feedbackSummary: { type: String },
    detailedFeedback: { type: String },
    suggestedKeywords: [{ type: String }],
    suggestedSkills: [{ type: String }],
    rawAiResponse: { type: Schema.Types.Mixed },
    reportVersion: { type: Number, default: 1 }
  },
  { timestamps: true }
);

export default model<IAiMatchReport>('AiMatchReport', AiMatchReportSchema);
