import mongoose, { Schema, model } from 'mongoose';
import { IApplication } from '../interfaces/IApplication';

const ApplicationSchema = new Schema<IApplication>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    cvId: { type: Schema.Types.ObjectId, ref: 'CV', required: true },
    status: {
      type: String,
      enum: ['applied', 'interviewing', 'rejected', 'offered', 'accepted', 'withdrawn'],
      default: 'applied'
    },
    appliedDate: { type: Date, default: Date.now },
    aiMatchScore: { type: Number, min: 0, max: 100 },
    aiMatchFeedback: { type: String },
    followUpEmailSentDate: { type: Date },
    notes: { type: String },
    rejectionReason: { type: String },
    offerSalary: { type: Number },
    offerBenefits: { type: String },
    offerStartDate: { type: Date }
  },
  { timestamps: true }
);

ApplicationSchema.index({ userId: 1, jobId: 1, cvId: 1 }, { unique: true });

export default model<IApplication>('Application', ApplicationSchema);
