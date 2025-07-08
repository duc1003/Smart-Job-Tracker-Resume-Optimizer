import { Request, Response } from "express";
import { Types } from 'mongoose';
import { ApplicationService } from "../services/Application.service";


export class ApplicationController {
    private applicationService : ApplicationService;

    constructor(){
        this.applicationService = new ApplicationService();

        this.getAllApplications = this.getAllApplications.bind(this)
        this.getApplicationByUserId = this.getApplicationByUserId.bind(this)
        this.createApplication = this.createApplication.bind(this)
        this.getApplicationById = this.getApplicationById.bind(this)
        this.updateApplication = this.updateApplication.bind(this)
        this.deleteApplication = this.deleteApplication.bind(this)

    }

    /**
     * Get all applications (for admin use or internal logic).
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getAllApplications(req: Request, res: Response): Promise<void> {
        try {
            // IMPORTANT: This endpoint exposes ALL applications.
            // You should add an admin-level authorization middleware here if only admins should access this.
            const applications = await this.applicationService.findAllApplication();
            res.status(200).json({
                message: "All applications retrieved successfully",
                applications: applications,
            });
        } catch (error:any) {
            console.error('Error retrieving all applications:', error.message);
            res.status(500).json({ 
                message: "Failed to retrieve applications",
                error: error.message 
            });
        }
    }

    /**
     * Get applications by User ID.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getApplicationByUserId(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const targetUserId = req.params.user_id;
            
            if (!targetUserId || !Types.ObjectId.isValid(targetUserId)) {
                res.status(400).json({ error: "Invalid User ID!" });
                return;
            }

            const applications = await this.applicationService.findApplicationByUserId(targetUserId);
            
            if (!applications || applications.length === 0) {
                res.status(404).json({ error: "No applications found for this user!" });
                return;
            }

            res.status(200).json({
                message: `Applications for User ID ${targetUserId}`,
                applications: applications,
            });
        } catch (error:any) {
            console.error('Error retrieving applications by User ID:', error.message);
            res.status(500).json({ 
                message: "Failed to retrieve applications by User ID",
                error: error.message 
            });
        }
    }

    /**
     * Create a new application.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async createApplication(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const applicationData = req.body;
            
            if (!applicationData) {
                res.status(400).json({ message: 'Application data is required.' });
                return;
            }

            const newApplication = await this.applicationService.createApplication({...applicationData, userId: req.user.id});
            res.status(201).json({
                message: "Application created successfully",
                application: newApplication,
            });
        } catch (error:any) {
            console.error('Error creating application:', error.message);
            res.status(500).json({ 
                message: "Failed to create application",
                error: error.message 
            });
        }
    }
    
    /**
     * Get application by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getApplicationById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const applicationId = req.params.application_id;
            
            if (!applicationId || !Types.ObjectId.isValid(applicationId)) {
                res.status(400).json({ error: "Invalid Application ID format!" });
                return;
            }

            const application = await this.applicationService.findApplicationById(applicationId);
            
            if (!application) {
                res.status(404).json({ message: "Application not found." });
                return;
            }

            res.status(200).json({
                message: `Application for ID ${applicationId}`,
                application: application,
            });
        } catch (error:any) {
            console.error('Error retrieving application:', error.message);
            if (error.message.includes('Invalid Application ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ 
                message: "Failed to retrieve application",
                error: error.message 
            });
        }
    }

    /**
     * Update application by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async updateApplication(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const applicationId = req.params.application_id;
            const applicationData = req.body;
            
            if (!applicationId || !Types.ObjectId.isValid(applicationId)) {
                res.status(400).json({ error: "Invalid Application ID format!" });
                return;
            }

            if (!applicationData) {
                res.status(400).json({ message: 'Application data is required for update.' });
                return;
            }
            
            const updatedApplication = await this.applicationService.updateApplication(applicationId, applicationData);
            
            if (!updatedApplication) {
                res.status(404).json({ message: "Application not found or you do not have permission to update it." });
                return;
            }

            res.status(200).json({
                message: "Application updated successfully",
                application: updatedApplication,
            });
        } catch (error:any) {
            console.error('Error updating application:', error.message);
            if (error.message.includes('Invalid Application ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ 
                message: "Failed to update application",
                error: error.message 
            });
        }
    }

    /**
     * Delete application by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async deleteApplication(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const applicationId = req.params.application_id;
            
            if (!applicationId || !Types.ObjectId.isValid(applicationId)) {
                res.status(400).json({ error: "Invalid Application ID format!" });
                return;
            }

            const deletedApplication = await this.applicationService.deleteApplication(applicationId);
            
            if (!deletedApplication) {
                res.status(404).json({ message: "Application not found or you do not have permission to delete it." });
                return;
            }

            res.status(200).json({
                message: "Application deleted successfully",
                application: deletedApplication,
            });
        } catch (error:any) {
            console.error('Error deleting application:', error.message);
            if (error.message.includes('Invalid Application ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({ 
                message: "Failed to delete application",
                error: error.message 
            });
        }
    }
}