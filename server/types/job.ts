import { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  recruiterId?: Schema.Types.ObjectId; // Optional: Reference to the User (recruiter) who posted it
  title: string;
  companyName: string;
  location: string;
  description: string; // Full text of the Job Description
  externalUrl?: string; // URL to the original job posting
  source: 'internal' | 'linkedin' | 'indeed' | 'other_scraper' | 'manual'; // Origin of the job post
  postedDate?: Date; // Original date the job was posted
  applicationDeadline?: Date;
  isActive: boolean; // For recruiters to enable/disable job visibility
  aiScoreThreshold?: number; // Optional: Minimum AI score for suitable candidates set by recruiter
  createdAt: Date;
  updatedAt: Date;
}