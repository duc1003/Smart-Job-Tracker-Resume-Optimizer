import mongoose, { Schema, model } from 'mongoose';
import { IApplicationInterviewDate } from '../interfaces/IApplicationInterviewDate';

const ApplicationInterviewDateSchema = new Schema<IApplicationInterviewDate>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application', required: true },
    interviewDate: { type: Date, required: true },
    type: { type: String, enum: ['initial', 'technical', 'hr', 'onsite'] },
    googleCalendarEventId: { type: String },
    notes: { type: String }
  },
  { timestamps: true }
);

export default model<IApplicationInterviewDate>('ApplicationInterviewDate', ApplicationInterviewDateSchema);
