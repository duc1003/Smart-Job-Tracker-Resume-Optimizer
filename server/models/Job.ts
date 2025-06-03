import { Schema, model } from 'mongoose';
import { IJob } from '../types/job';

const JobSchema = new Schema<IJob>({
  recruiterId: { type: Schema.Types.ObjectId, ref: 'User', index: true }, // Index for quicker lookup by recruiter
  title: { type: String, required: true, trim: true },
  companyName: { type: String, required: true, trim: true },
  location: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  externalUrl: { type: String },
  source: { type: String, enum: ['internal', 'linkedin', 'indeed', 'other_scraper', 'manual'], required: true },
  postedDate: { type: Date },
  applicationDeadline: { type: Date },
  isActive: { type: Boolean, default: true },
  aiScoreThreshold: { type: Number, min: 0, max: 100 },
}, { timestamps: true });

// Optional: Add a text index for job search if needed later
// JobSchema.index({ title: 'text', description: 'text', companyName: 'text' });

export const Job = model<IJob>('Job', JobSchema);