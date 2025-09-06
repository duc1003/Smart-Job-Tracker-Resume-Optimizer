import { Document, Types } from 'mongoose';

export interface IApplicationInterviewDate extends Document {
  applicationId: Types.ObjectId;
  interviewDate: Date;
  type: 'initial' | 'technical' | 'hr' | 'onsite';
  googleCalendarEventId?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}
