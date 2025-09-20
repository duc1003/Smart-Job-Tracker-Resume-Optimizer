import { Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash?: string;
  googleId?: string;
  linkedinId?: string;
  role: 'job_seeker' | 'recruiter' | 'admin';
  name?: string;
  profilePictureUrl?: string;
  googleAccessToken?: string;
  googleRefreshToken?: string;
  googleCalendarId?: string;
  linkedinAccessToken?: string;
  indeedAccessToken?: string;
  createdAt: Date;
  updatedAt: Date;
}
