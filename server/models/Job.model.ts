import mongoose, { Schema, model } from 'mongoose';
import { IJob } from '../interfaces/IJob';

const JobSchema = new Schema<IJob>(
  {
    recruiterId: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    title: { type: String, required: true },
    companyName: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    externalUrl: { type: String },
    source: {
      type: String,
      enum: ['internal', 'linkedin', 'indeed', 'other_scraper', 'manual'],
      required: true
    },
    postedDate: { type: Date },
    applicationDeadline: { type: Date },
    isActive: { type: Boolean, default: true },
    aiScoreThreshold: { type: Number, min: 0, max: 100 }
  },
  { timestamps: true }
);

export default model<IJob>('Job', JobSchema);
