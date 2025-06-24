import { Document, Types } from 'mongoose';

export interface IAiMatchReport extends Document {
  applicationId: Types.ObjectId;
  cvId: Types.ObjectId;
  jobId: Types.ObjectId;
  reportDate: Date;
  matchScore: number;
  feedbackSummary?: string;
  detailedFeedback?: string;
  suggestedKeywords?: string[];
  suggestedSkills?: string[];
  rawAiResponse?: any;
  reportVersion?: number;
  createdAt: Date;
  updatedAt: Date;
}
