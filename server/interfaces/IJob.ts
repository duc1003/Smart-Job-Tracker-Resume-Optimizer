import { Document, Types } from 'mongoose';

export interface IJob extends Document {
  recruiterId?: Types.ObjectId;
  title: string;
  companyName: string;
  location: string;
  description: string;
  externalUrl?: string;
  source: 'internal' | 'linkedin' | 'indeed' | 'other_scraper' | 'manual';
  postedDate?: Date;
  applicationDeadline?: Date;
  isActive: boolean;
  aiScoreThreshold?: number;
  createdAt: Date;
  updatedAt: Date;
}
