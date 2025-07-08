import { Document } from "mongoose";
import { ICV } from "../interfaces/ICV";
import CVSchema from "../models/CV.model";

type CVDocument = ICV & Document;

export class CVService {
  /**
   * Upload CV
   * @param cvData - CV data to be uploaded
   * @returns Promise<ICV> - the uploaded CV object
   */
  public async uploadCV(cvData: Partial<ICV>): Promise<ICV> {
    try {
      const newCV: CVDocument = new CVSchema(cvData);
      return await newCV.save();
    } catch (error) {
      console.error(`[CVService][uploadCV] Error uploading CV:`, error);
      throw new Error("Failed to upload CV due to a server error.");
    }
  }
  /**
   * Get CV by ID
   * @param id - ID of the CV to retrieve
   * @returns Promise<ICV | null> - the CV object or null if not found
   */
  public async getCVById(id: string): Promise<ICV | null> {
    try {
      return await CVSchema.findById(id).exec();
    } catch (error) {
      console.error(
        `[CVService][getCVById] Error retrieving CV by ID '${id}':`,
        error
      );
      throw new Error("Failed to retrieve CV due to a server error.");
    }
  }
  /**
   * Update CV by ID
   * @param id - ID of the CV to update
   * @param updateData - data to update the CV with
   * @returns Promise<ICV | null> - the updated CV object or null if not found
   */
  public async updateCVById(
    id: string,
    updateData: Partial<ICV>
  ): Promise<ICV | null> {
    try {
      const updatedCV = await CVSchema.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      }).exec();
      return updatedCV;
    } catch (error) {
      console.error(
        `[CVService][updateCVById] Error updating CV by ID '${id}':`,
        error
      );
      throw new Error("Failed to update CV due to a server error.");
    }
  }
  /**
   * Delete CV by ID
   * @param id - ID of the CV to delete
   * @returns Promise<ICV | null> - the deleted CV object or null if not found
   */
  public async deleteCVById(id: string): Promise<ICV | null> {
    try {
      const deletedCV = await CVSchema.findByIdAndDelete(id).exec();
      if (!deletedCV) {
        throw new Error("CV not found.");
      }
      return deletedCV;
    } catch (error) {
      console.error(
        `[CVService][deleteCVById] Error deleting CV by ID '${id}':`,
        error
      );
      throw new Error("Failed to delete CV due to a server error.");
    }
  }
  /**
   * Get all CVs
   * @returns Promise<ICV[]> - an array of all CVs
   */
  public async getAllCVs(): Promise<ICV[]> {
    try {
      return await CVSchema.find().exec();
    } catch (error) {
      console.error(`[CVService][getAllCVs] Error retrieving all CVs:`, error);
      throw new Error("Failed to retrieve CVs due to a server error.");
    }
  }
  /**
   * Find CVs by user ID
   * @param userId - ID of the user whose CVs to find
   * @returns Promise<ICV[]> - an array of CVs belonging to the user
   */
  public async findCVsByUserId(userId: string): Promise<ICV[]> {
    try {
      return await CVSchema.find({ userId }).exec();
    } catch (error) {
      console.error(
        `[CVService][findCVsByUserId] Error finding CVs by user ID '${userId}':`,
        error
      );
      throw new Error("Failed to find CVs due to a server error.");
    }
  }
}
