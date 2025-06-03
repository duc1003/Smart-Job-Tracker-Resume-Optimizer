import { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  userId: Schema.Types.ObjectId; // Reference to the Job Seeker
  jobId: Schema.Types.ObjectId; // Reference to the Job applied for
  cvId: Schema.Types.ObjectId; // Reference to the specific CV used for this application
  status: 'applied' | 'interviewing' | 'rejected' | 'offered' | 'accepted' | 'withdrawn'; // Tracking states
  appliedDate: Date;
  aiMatchScore?: number; // GPT-4 assessed match score (0-100)
  aiMatchFeedback?: string; // GPT-4's suggestions for improvement for this specific application
  followUpEmailSentDate?: Date; // Timestamp of the last follow-up email sent
  interviewDates?: {
    date: Date;
    type?: 'initial' | 'technical' | 'hr' | 'onsite'; // Type of interview
    googleCalendarEventId?: string; // ID of the event in Google Calendar
    notes?: string; // Specific notes for this interview
  }[];
  notes?: string; // General notes for this application
  rejectionReason?: string; // If status is 'rejected'
  offerDetails?: { // If status is 'offered' / 'accepted'
    salary?: number;
    benefits?: string;
    startDate?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}