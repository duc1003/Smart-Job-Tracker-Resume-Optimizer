import { Schema, model } from 'mongoose';
import { IAIMatchReport } from '../types/aiMatchReport';

const AIMatchReportSchema = new Schema<IAIMatchReport>({
  applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true, unique: true }, // One report per application
  cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  reportDate: { type: Date, default: Date.now },
  matchScore: { type: Number, required: true, min: 0, max: 100 },
  feedbackSummary: { type: String },
  detailedFeedback: { type: String },
  suggestedKeywords: [{ type: String }],
  suggestedSkills: [{ type: String }],
  rawAIResponse: { type: Schema.Types.Mixed }, // Use Mixed for flexible JSON
  reportVersion: { type: Number, default: 1 },
}, { timestamps: true });

export const AIMatchReport = model<IAIMatchReport>('AIMatchReport', AIMatchReportSchema);