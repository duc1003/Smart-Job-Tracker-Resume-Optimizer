import { Request, Response } from "express";
import { CVService } from "../services/CV.service";


export class CVController {
    private cvService: CVService;


    constructor() {
        this.cvService = new CVService();
        // Bind methods to the class instance
        this.uploadCV = this.uploadCV.bind(this);
        this.getCVById = this.getCVById.bind(this);
        this.updateCVById = this.updateCVById.bind(this);
        this.deleteCVById = this.deleteCVById.bind(this);
        this.getAllCVs = this.getAllCVs.bind(this);
        this.getCVsByUserId = this.getCVsByUserId.bind(this);
    }
    /**
     * Upload a CV
     * @param req - Express request object
     * @param res - Express response object
     */
    public async uploadCV(req: Request, res: Response): Promise<void> {
        try {
            const cvData = req.body; // Assuming CV data is sent in the request body
            const uploadedCV = await this.cvService.uploadCV(cvData);
            res.status(201).json({
                message: "CV uploaded successfully",
                cv: uploadedCV,
            });
        } catch (error: any) {
            res.status(500).json({
                message: "Failed to upload CV",
                error: error.message,
            });
        }
    }
    /**
     * Get CV by ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getCVById(req: Request, res: Response): Promise<void> {
        try {
            const cvId = req.params.id;
            if (!cvId || cvId.length !== 24) {
                res.status(400).json({ error: "Invalid CV ID!" });
                return;
            }
            const cv = await this.cvService.getCVById(cvId);
            if (!cv) {
                res.status(404).json({ error: "CV not found!" });
                return;
            }
            res.status(200).json({
                message: `CV for ID ${cvId}`,
                cv: cv,
            });
        } catch (error: any) {
            res.status(500).json({
                error: "Failed to retrieve CV",
                details: error.message,
            });
        }
    }
    /**
     * Update CV by ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async updateCVById(req: Request, res: Response): Promise<void> {
        try {
            const cvId = req.params.id;
            if (!cvId || cvId.length !== 24) {
                res.status(400).json({ error: "Invalid CV ID!" });
                return;
            }
            const updatedCV = await this.cvService.updateCVById(cvId, req.body);
            if (!updatedCV) {
                res.status(404).json({ error: "CV not found!" });
                return;
            }
            res.status(200).json({
                message: "CV updated successfully",
                cv: updatedCV,
            });
        } catch (error: any) {
            res.status(500).json({
                error: "Failed to update CV",
                details: error.message,
            });
        }
    }
    /**
     * Delete CV by ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async deleteCVById(req: Request, res: Response): Promise<void> {
        try {
            const cvId = req.params.id;
            if (!cvId || cvId.length !== 24) {
                res.status(400).json({ error: "Invalid CV ID!" });
                return;
            }
            const deletedCV = await this.cvService.deleteCVById(cvId);
            if (!deletedCV) {
                res.status(404).json({ error: "CV not found!" });
                return;
            }
            res.status(200).json({
                message: "CV deleted successfully",
                cv: deletedCV,
            });
        } catch (error: any) {
            res.status(500).json({
                error: "Failed to delete CV",
                details: error.message,
            });
        }
    }
    /**
     * Get all CVs
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getAllCVs(req: Request, res: Response): Promise<void> {
        try {
            const allCVs = await this.cvService.getAllCVs();
            res.status(200).json({
                message: "All CVs retrieved successfully",
                cvs: allCVs,
            });
        } catch (error: any) {
            res.status(500).json({
                error: "Failed to retrieve CVs",
                details: error.message,
            });
        }
    }
    /**
     * Get CVs by User ID
     * @param req - Express request object
     * @param res - Express response object
     */
    public async getCVsByUserId(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.params.userId;
            if (!userId || userId.length !== 24) {
                res.status(400).json({ error: "Invalid User ID!" });
                return;
            }
            const cvs = await this.cvService.findCVsByUserId(userId);
            if (!cvs || cvs.length === 0) {
                res.status(404).json({ error: "No CVs found for this user!" });
                return;
            }
            res.status(200).json({
                message: `CVs for User ID ${userId}`,
                cvs: cvs,
            });
        } catch (error: any) {
            res.status(500).json({
                error: "Failed to retrieve CVs by User ID",
                details: error.message,
            });
        }
    }
    
}