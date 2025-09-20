import CV from '../models/CV.model';
import { ICV } from '../interfaces/ICV';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';

export class CVService { // Make it exportable as a class


  public async createCV(userId: Types.ObjectId, name: string, content: string, filePath: string): Promise<ICV> {
    if (!filePath) {
      throw new Error('File path is required for CV creation.');
    }
    const newCV = new CV({
      userId,
      name,
      content: content || '', // Use content if provided, otherwise empty string
      filePath,
      // googleDriveFileId would be handled here if you integrate Google Drive upload
    });
    await newCV.save();
    return newCV;
  }

  public async getCVsByUserId(userId: Types.ObjectId): Promise<ICV[]> {
    return await CV.find({ userId }).sort({ createdAt: -1 });
  }

  public async getCVById(cvId: string, userId: Types.ObjectId): Promise<ICV | null> {
    if (!Types.ObjectId.isValid(cvId)) {
      throw new Error('Invalid CV ID format.');
    }
    // Ensure the CV belongs to the user
    return await CV.findOne({ _id: cvId, userId });
  }


  public async updateCVById(cvId: string, userId: Types.ObjectId, updateData: { name?: string; content?: string; lastOptimizedForJobId?: Types.ObjectId }): Promise<ICV | null> {
    if (!Types.ObjectId.isValid(cvId)) {
      throw new Error('Invalid CV ID format.');
    }
    const updatedCV = await CV.findOneAndUpdate(
      { _id: cvId, userId }, // Ensure user owns the CV
      { ...updateData, updatedAt: new Date() },
      { new: true }
    );
    return updatedCV;
  }


  public async deleteCVById(cvId: string, userId: Types.ObjectId): Promise<ICV | null> {
    if (!Types.ObjectId.isValid(cvId)) {
      throw new Error('Invalid CV ID format.');
    }
    const deletedCV = await CV.findOneAndDelete({ _id: cvId, userId }); // Ensure user owns the CV

    if (deletedCV && deletedCV.filePath) {
      // Delete the physical file
      fs.unlink(deletedCV.filePath, (err) => {
        if (err) console.error('Error deleting CV file from disk:', err);
      });
    }
    return deletedCV;
  }

  public async getAllCVs(): Promise<ICV[]> {
    return await CV.find({}).sort({ createdAt: -1 });
  }
}