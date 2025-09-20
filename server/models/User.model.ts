import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    googleId: { type: String, unique: true, sparse: true },
    linkedinId: { type: String, unique: true, sparse: true },
    role: { type: String, enum: ['job_seeker', 'recruiter', 'admin'], required: true },
    name: { type: String },
    profilePictureUrl: { type: String },
    googleAccessToken: { type: String },
    googleRefreshToken: { type: String },
    googleCalendarId: { type: String },
    linkedinAccessToken: { type: String },
    indeedAccessToken: { type: String }
  },
  { timestamps: true }
);

export default model<IUser>('User', UserSchema);
