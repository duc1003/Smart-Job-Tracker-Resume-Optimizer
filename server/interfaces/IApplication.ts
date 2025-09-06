import { Document, Types } from 'mongoose';

export interface IApplication extends Document {
  userId: Types.ObjectId;
  jobId: Types.ObjectId;
  cvId: Types.ObjectId;
  status: 'applied' | 'interviewing' | 'rejected' | 'offered' | 'accepted' | 'withdrawn';
  appliedDate: Date;
  aiMatchScore?: number;
  aiMatchFeedback?: string;
  followUpEmailSentDate?: Date;
  notes?: string;
  rejectionReason?: string;
  offerSalary?: number;
  offerBenefits?: string;
  offerStartDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}
