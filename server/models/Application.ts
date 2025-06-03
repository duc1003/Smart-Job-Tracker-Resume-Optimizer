import { Schema, model } from 'mongoose';
import { IApplication } from '../types/application';

const ApplicationSchema = new Schema<IApplication>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true, index: true },
  cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
  status: {
    type: String,
    enum: ['applied', 'interviewing', 'rejected', 'offered', 'accepted', 'withdrawn'],
    default: 'applied',
    required: true,
  },
  appliedDate: { type: Date, default: Date.now },
  aiMatchScore: { type: Number, min: 0, max: 100 },
  aiMatchFeedback: { type: String },
  followUpEmailSentDate: { type: Date },
  interviewDates: [{ // Array of sub-documents for each interview
    date: { type: Date, required: true },
    type: { type: String, enum: ['initial', 'technical', 'hr', 'onsite'] },
    googleCalendarEventId: { type: String },
    notes: { type: String },
  }],
  notes: { type: String },
  rejectionReason: { type: String },
  offerDetails: {
    salary: { type: Number },
    benefits: { type: String },
    startDate: { type: Date },
  },
}, { timestamps: true });

// Ensure a user applies to a specific job with a specific CV only once
ApplicationSchema.index({ userId: 1, jobId: 1, cvId: 1 }, { unique: true });

export const Application = model<IApplication>('Application', ApplicationSchema);