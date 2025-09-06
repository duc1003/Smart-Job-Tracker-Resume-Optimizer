import { IJob } from "../interfaces/IJob";
import JobSchema from "../models/Job.model";
import { Document } from "mongoose";

// Define a type for a Mongoose Job Document to include methods like .save()
// This assumes IJob is already defined and matches your Mongoose Schema
type JobDocument = IJob & Document;

export class JobService {
  /**
   * find job by id
   * @param id - id of job
   * @returns Promise<IJob | null> - job object or null if not found
   */
  public async findJobById(id: string): Promise<IJob | null> {
    try {
      // No 'await' needed here as the function is async and will return the Promise directly
      return JobSchema.findById(id);
    } catch (error) {
      console.error(
        `[JobService][findJobById] Error finding job by id '${id}':`,
        error
      );
      // Re-throw a more generic error or a custom application-specific error
      throw new Error("Failed to retrieve job due to a server error.");
    }
  }

  public async createJob(jobData: Partial<IJob>): Promise<IJob | null> {
    try {
      const newJob: JobDocument = new JobSchema(jobData);
      return await newJob.save();
    } catch (error: any) {
      // Using 'any' for error type to handle various Mongoose/MongoDB errors
      // Check for duplicate key error (MongoDB error code 11000)
      if (error.code === 11000) {
        console.warn(
          `[JobService][createJob] Attempted to create job with existing title: '${jobData.title}'`
        );
        throw new Error("Job with this title already exists.");
      }
      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message
        );
        console.error(
          `[JobService][createJob] Mongoose Validation Error for job '${jobData.title}':`,
          messages
        );
        throw new Error(`Validation failed: ${messages.join(", ")}`);
      }

      console.error(
        `[JobService][createJob] Error creating job '${jobData.title}':`,
        error
      );
      // Re-throw a more generic error for other unexpected issues
      throw new Error("Failed to create job due to a server error.");
    }
  }
  /**
   * find all jobs
   * @returns Promise<IJob[]> - array of job objects
   */
  public async findAllJobs(): Promise<IJob[]> {
    try {
      return JobSchema.find({});
    } catch (error) {
      console.error(`[JobService][findAllJobs] Error finding all jobs:`, error);
      // Re-throw a more generic error or a custom application-specific error
      throw new Error("Failed to retrieve jobs due to a server error.");
    }
  }
  /**
   * update job by id
   * @param id - id of job
   * @param jobData - object containing job data to update
   * @returns Promise<IJob | null> - updated job object or null if not found
   */
  public async updateJobById(
    id: string,
    jobData: Partial<IJob>
  ): Promise<IJob | null> {
    try {
      const updatedJob = await JobSchema.findByIdAndUpdate(id, jobData, {
        new: true, // Return the updated document
        runValidators: true, // Run schema validation on the update
      });
      return updatedJob;
    } catch (error: any) {
      console.error(
        `[JobService][updateJob] Error updating job '${id}':`,
        error
      );
      // Handle Mongoose validation errors
      if (error.name === "ValidationError") {
        const messages = Object.values(error.errors).map(
          (err: any) => err.message
        );
        console.error(
          `[JobService][updateJob] Mongoose Validation Error for job '${id}':`,
          messages
        );
        throw new Error(`Validation failed: ${messages.join(", ")}`);
      }
      // Re-throw a more generic error for other unexpected issues
      throw new Error("Failed to update job due to a server error.");
    }
  }
  /**
   * delete job by id
   * @param id - id of job
   * @returns Promise<IJob | null> - deleted job object or null if not found
   */
  public async deleteJobById(id: string): Promise<IJob | null> {
    try {
      const deletedJob = await JobSchema.findByIdAndDelete(id);
      if (!deletedJob) {
        console.warn(`[JobService][deleteJob] Job with id '${id}' not found.`);
        return null; // Return null if no job was found to delete
      }
      return deletedJob;
    } catch (error) {
      console.error(
        `[JobService][deleteJob] Error deleting job '${id}':`,
        error
      );
      // Re-throw a more generic error or a custom application-specific error
      throw new Error("Failed to delete job due to a server error.");
    }
  }
}
