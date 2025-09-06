import { Request, Response } from "express";
import { Types } from 'mongoose';
import { CVService } from "../services/CV.service";
import fs from 'fs'; // Still needed for potential early file cleanup


export class CVController {
    private cvService: CVService;

    constructor() {
        this.cvService = new CVService();
        // Bind methods to the class instance to ensure 'this' context is correct
        this.uploadCV = this.uploadCV.bind(this);
        this.getCVById = this.getCVById.bind(this);
        this.updateCVById = this.updateCVById.bind(this);
        this.deleteCVById = this.deleteCVById.bind(this);
        this.getAllCVs = this.getAllCVs.bind(this);
        this.getCVsByUserId = this.getCVsByUserId.bind(this);
    }

    /**
     * Upload a CV file (PDF/DOCX) and save its data.
     * @param req - Express request object (with file from Multer)
     * @param res - Express response object
     */
    public async uploadCV(req: Request, res: Response): Promise<void> {
        try {
            // console.log('Uploaded file:', req.file);
            if (!req.user || !req.user.id) {
                // This shouldn't happen if authMiddleware is correctly placed before multer
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            if (!req.file) {
                res.status(400).json({ message: 'No CV file uploaded.' });
                return;
            }

            const { name, content } = req.body; // 'name' and 'content' sent as part of form-data
            console.log('Uploaded file:', req.body);
            if (!name) {
                // Clean up the uploaded file if validation fails early
                fs.unlinkSync(req.file.path);
                res.status(400).json({ message: 'CV name is required.' });
                return;
            }

            // Call the service method with userId and file path
            const userId = new Types.ObjectId(req.user.id)
            const uploadedCV = await this.cvService.createCV(userId, name, content || '', req.file.path);
            
            res.status(201).json({
                message: "CV uploaded successfully",
                cv: uploadedCV,
            });
        } catch (error: any) {
            // Ensure the file is deleted if any error occurs during DB save or service logic
            if (req.file) {
                fs.unlinkSync(req.file.path);
            }
            console.error('Error uploading CV:', error.message);
            res.status(500).json({
                message: "Failed to upload CV",
                error: error.message,
            });
        }
    }

    /**
     * Get CV by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getCVById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }
            const cvId = req.params.id;
            const userId = new Types.ObjectId(req.user.id);
            const cv = await this.cvService.getCVById(cvId, userId); // Pass userId for authorization
            
            if (!cv) {
                res.status(404).json({ message: "CV not found or you do not have permission to access it." });
                return;
            }
            res.status(200).json({
                message: `CV for ID ${cvId}`,
                cv: cv,
            });
        } catch (error: any) {
            console.error('Error retrieving CV:', error.message);
            // Specific error handling for invalid ID format
            if (error.message.includes('Invalid CV ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({
                message: "Failed to retrieve CV",
                error: error.message,
            });
        }
    }

    /**
     * Update CV by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async updateCVById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }
            const cvId = req.params.id;
            const updateData = req.body;
            const userId = new Types.ObjectId(req.user.id);
            const updatedCV = await this.cvService.updateCVById(cvId, userId, updateData); // Pass userId

            if (!updatedCV) {
                res.status(404).json({ message: "CV not found or you do not have permission to update it." });
                return;
            }
            res.status(200).json({
                message: "CV updated successfully",
                cv: updatedCV,
            });
        } catch (error: any) {
            console.error('Error updating CV:', error.message);
            if (error.message.includes('Invalid CV ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({
                message: "Failed to update CV",
                error: error.message,
            });
        }
    }

    /**
     * Delete CV by ID for the authenticated user.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async deleteCVById(req: Request, res: Response): Promise<void> {
        try {
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }
            const cvId = req.params.id;
            const userId = new Types.ObjectId(req.user.id);
            const deletedCV = await this.cvService.deleteCVById(cvId, userId); // Pass userId
            
            if (!deletedCV) {
                res.status(404).json({ message: "CV not found or you do not have permission to delete it." });
                return;
            }
            res.status(200).json({
                message: "CV deleted successfully",
                cv: deletedCV, // You might want to return a simpler success message here
            });
        } catch (error: any) {
            console.error('Error deleting CV:', error.message);
            if (error.message.includes('Invalid CV ID format')) {
                res.status(400).json({ error: error.message });
                return;
            }
            res.status(500).json({
                message: "Failed to delete CV",
                error: error.message,
            });
        }
    }

    /**
     * Get all CVs (for admin use or internal logic that requires all CVs).
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getAllCVs(req: Request, res: Response): Promise<void> {
        try {
            // IMPORTANT: This endpoint exposes ALL CVs.
            // You should add an admin-level authorization middleware here if only admins should access this.
            // For general user flow, use getCVsByUserId.
            const allCVs = await this.cvService.getAllCVs();
            res.status(200).json({
                message: "All CVs retrieved successfully",
                cvs: allCVs,
            });
        } catch (error: any) {
            console.error('Error retrieving all CVs:', error.message);
            res.status(500).json({
                message: "Failed to retrieve CVs",
                error: error.message,
            });
        }
    }

    /**
     * Get CVs by User ID (This logic is very similar to getCVs, so consider merging if redundant).
     * This endpoint implies a user might fetch CVs for *another* user, which needs careful authorization.
     * If it's for *the authenticated user*, then `getCVs` (from previous examples) with `req.userId` is more appropriate.
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getCVsByUserId(req: Request, res: Response): Promise<void> {
        try {
            // This method in the controller is for fetching CVs by a specific user ID provided in params.
            // You might need an ADMIN role check here if a non-owner user is requesting this.
            // If it's for the *authenticated user*, then req.userId should be used instead of req.params.userId.
            if (!req.user || !req.user.id) {
                res.status(401).json({ message: 'User not authenticated.' });
                return;
            }

            const targetUserId = req.params.user_id; // This is the ID from the URL param
            
            // SECURITY NOTE: If req.params.userId is different from req.userId,
            // you must add an authorization check here (e.g., isAdmin middleware).
            // Otherwise, any logged-in user could fetch any other user's CVs.
            // If this endpoint is *only* for fetching the *authenticated user's* CVs,
            // then use req.userId directly and remove req.params.userId.

            if (!targetUserId || !Types.ObjectId.isValid(targetUserId)) {
                res.status(400).json({ error: "Invalid User ID!" });
                return;
            }
            
            const cvs = await this.cvService.getCVsByUserId(new Types.ObjectId(targetUserId));
            
            if (!cvs || cvs.length === 0) {
                res.status(404).json({ error: "No CVs found for this user!" });
                return;
            }
            res.status(200).json({
                message: `CVs for User ID ${targetUserId}`,
                cvs: cvs,
            });
        } catch (error: any) {
            console.error('Error retrieving CVs by User ID:', error.message);
            res.status(500).json({
                message: "Failed to retrieve CVs by User ID",
                details: error.message,
            });
        }
    }
}