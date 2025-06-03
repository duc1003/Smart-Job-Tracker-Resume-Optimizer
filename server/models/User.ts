import { Schema, model } from 'mongoose';
import { IUser } from '../types/user';

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false }, // Store hashed password, don't return by default
  googleId: { type: String, unique: true, sparse: true }, // sparse allows nulls but enforces unique for non-null
  linkedinId: { type: String, unique: true, sparse: true },
  role: { type: String, enum: ['job_seeker', 'recruiter'], required: true },
  name: { type: String, trim: true },
  profilePictureUrl: { type: String },
  googleAccessToken: { type: String, select: false }, // Sensitive data, exclude by default
  googleRefreshToken: { type: String, select: false }, // Sensitive data, exclude by default
  googleCalendarId: { type: String },
  linkedinAccessToken: { type: String, select: false },
  indeedAccessToken: { type: String, select: false },
}, { timestamps: true }); // Mongoose adds createdAt and updatedAt fields automatically

export const User = model<IUser>('User', UserSchema);