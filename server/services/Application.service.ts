import { IApplication } from "../interfaces/IApplication";
import ApplicationSchema from "../models/Application.model";
import { Document } from "mongoose";

export class ApplicationService {

  public async findApplicationById(id: string): Promise<IApplication | null> {
    try {
      return ApplicationSchema.findById(id);
    } catch (error) {
      console.error(
        `[ApplicationService][findApplicationById] Error finding application by id '${id}':`,
        error
      );
      throw new Error("Failed to retrieve application due to a server error.");
    }
  }


  
  public async createApplication(applicationData: Partial<IApplication>): Promise<IApplication | null> {
    try {
      const newApplication = new ApplicationSchema(applicationData);
      return await newApplication.save();
    } catch (error: any) {
      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map((err: any) => err.message);
        console.error(
          `[ApplicationService][createApplication] Mongoose Validation Error for application:`,
          messages
        );
        throw new Error(`Validation failed: ${messages.join(", ")}`);
      }

      console.error(
        `[ApplicationService][createApplication] Error creating application:`,
        error
      );
      throw new Error("Failed to create application due to a server error.");
    }
  }


  public async findAllApplication(): Promise<IApplication[]> {
    try {
      return await ApplicationSchema.find();
    } catch (error) {
        console.error(
          `[ApplicationService][findAllApplication] Error finding all applications:`,
          error
        );
        throw new Error("Failed to retrieve applications due to a server error.");
    }
  }



  public async findApplicationByUserId(userId: string): Promise<IApplication[]> {
    try {
      return await ApplicationSchema.find({ userId:userId }).sort({ createdAt: -1 });
    } catch (error) {
      console.error(
        `[ApplicationService][findApplicationByUserId] Error finding application by user ID '${userId}':`,
        error
      );
      throw new Error("Failed to retrieve application due to a server error.");
    }
  }


  public async updateApplication(id: string, applicationData: Partial<IApplication>): Promise<IApplication | null> {
    try {
      const updatedApplication = await ApplicationSchema.findByIdAndUpdate(id, applicationData, { new: true });
      return updatedApplication;
    } catch (error) {
      console.error(
        `[ApplicationService][updateApplication] Error updating application with ID '${id}':`,
        error
      );
      throw new Error("Failed to update application due to a server error.");
    }
  }


  public async deleteApplication(id:string): Promise<IApplication | null>{
    try {
      const deletedApplication = await ApplicationSchema.findByIdAndDelete(id);
      return deletedApplication;
    } catch (error) {
      console.error(
        `[ApplicationService][deleteApplication] Error deleting application with ID '${id}':`,
        error
      );
      throw new Error("Failed to delete application due to a server error.");
    }
  }
}