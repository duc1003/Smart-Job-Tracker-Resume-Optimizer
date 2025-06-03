import { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password?: string; // Hashed password for local authentication
  googleId?: string; // For Google OAuth users
  linkedinId?: string; // For LinkedIn OAuth (if implemented later)
  role: 'job_seeker' | 'recruiter';
  name?: string;
  profilePictureUrl?: string; // URL to user's profile picture
  // Google API Integration Tokens
  googleAccessToken?: string;
  googleRefreshToken?: string; // Important for long-term access
  googleCalendarId?: string; // User's default Google Calendar ID
  // LinkedIn/Indeed API tokens (future expansion)
  linkedinAccessToken?: string;
  indeedAccessToken?: string;
  createdAt: Date;
  updatedAt: Date;
}