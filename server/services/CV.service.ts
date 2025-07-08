import CV from '../models/CV.model';
import { ICV } from '../interfaces/ICV';
import { Types } from 'mongoose';
import fs from 'fs';
import path from 'path';

export class CVService { // Make it exportable as a class

  /**
   * Creates and saves a new CV (including file path) in the database.
   * @param userId The ID of the user owning the CV.
   * @param name The name of the CV.
   * @param content The text content of the CV (can be extracted from PDF or provided manually).
   * @param filePath The physical file path of the uploaded CV.
   * @returns The newly created CV object.
   */
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

  /**
   * Retrieves all CVs for a specific user.
   * @param userId The ID of the user.
   * @returns An array of CV objects.
   */
  public async getCVsByUserId(userId: Types.ObjectId): Promise<ICV[]> {
    return await CV.find({ userId }).sort({ createdAt: -1 });
  }

  /**
   * Retrieves a single CV by its ID, ensuring it belongs to the specified user.
   * @param cvId The ID of the CV.
   * @param userId The ID of the user attempting to access the CV.
   * @returns The CV object or null if not found/not authorized.
   */
  public async getCVById(cvId: string, userId: Types.ObjectId): Promise<ICV | null> {
    if (!Types.ObjectId.isValid(cvId)) {
      throw new Error('Invalid CV ID format.');
    }
    // Ensure the CV belongs to the user
    return await CV.findOne({ _id: cvId, userId });
  }

  /**
   * Updates an existing CV by its ID, ensuring it belongs to the specified user.
   * @param cvId The ID of the CV to update.
   * @param userId The ID of the user owning the CV.
   * @param updateData Data to update (name, content, lastOptimizedForJobId).
   * @returns The updated CV object or null if not found/not authorized.
   */
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

  /**
   * Deletes a CV by its ID, ensuring it belongs to the specified user.
   * Also deletes the associated physical file.
   * @param cvId The ID of the CV to delete.
   * @param userId The ID of the user owning the CV.
   * @returns The deleted CV object or null if not found/not authorized.
   */
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

  /**
   * Retrieves all CVs in the database (typically for admin use).
   * @returns An array of all CV objects.
   */
  public async getAllCVs(): Promise<ICV[]> {
    return await CV.find({}).sort({ createdAt: -1 });
  }
}