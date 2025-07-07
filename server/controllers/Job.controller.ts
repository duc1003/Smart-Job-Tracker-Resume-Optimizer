import type { Request, Response } from "express";
import { JobService } from "../services/Job.service";
import mongoose from "mongoose";

export class JobController {
    private jobService: JobService;
    
    constructor(){
        this.jobService = new JobService()

        this.createJob = this.createJob.bind(this);
        this.getAllJobs = this.getAllJobs.bind(this);
        this.getJobById = this.getJobById.bind(this)
        this.updateJobById = this.updateJobById.bind(this)
        this.deleteJobById = this.deleteJobById.bind(this)
    }

    /**
     * Tạo một công việc mới
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async createJob(req:Request, res:Response):Promise<void>{
        try {
            const user = req.user;
            if (!user || !user.id){
                res.status(403).json({ message: 'Forbidden: User role not found or not authenticated.' });
                return ;
            }
            const recruiterId = new mongoose.Types.ObjectId(user.id);
            
            // Dữ liệu đã được validate bởi validationMiddleware
            const { title, companyName, location, description, source } = req.body;

            // Create Job
            const job = await this.jobService.createJob({
                recruiterId,
                title,
                companyName,
                location,
                description,
                source
            });

            res.status(201).json({
                message: 'Công việc đã được tạo thành công.',
                job:job
            });
        } catch (error) {
            res.status(400).json({
                message: 'Lỗi khi tạo job!',
                // job
            });
        }

    }

    /**
     * Lấy tất cả công việc
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async getAllJobs(req:Request, res:Response):Promise<void>{
        try {
            const jobs = await this.jobService.findAllJobs()
            res.status(200).json({
                message: 'Danh sách công việc',
                jobs: jobs
            });
        } catch (error) {
            res.status(500).json({
                error: 'Lỗi khi lấy danh sách công việc!',
            });
        }

    }

    /**
     * Lấy thông tin công việc theo ID
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async getJobById(req:Request, res:Response):Promise<void>{
        try {
            const jobId = req.params.id
            if (!jobId || jobId.length!==24){
                res.status(400).json({ error:"Invalid job id!" });
                return ;
            }
            const job = await this.jobService.findJobById(jobId);
            res.status(201).json({
                message: `Job for id ${jobId}`,
                job:job
            });
        } catch (error) {
            res.status(404).json({
                error: 'Công việc không tồn tại!'
            });
        }

    }

    /**
     *  Cập nhật thông tin Job theo ID
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async updateJobById(req:Request, res:Response):Promise<void>{
        try {
            const jobId = req.params.id
            if (!jobId || jobId.length!==24){
                res.status(400).json({ error:"Invalid job id!" });
                return ;
            }
            const job = await this.jobService.updateJobById(jobId, req.body);
            res.status(201).json({
                message: 'Công việc đã được cập nhật thành công.',
                job:job
            });
        } catch (error) {
            res.status(400).json({
                error: 'Lỗi khi cập nhật công việc!'
            });
        }
    }

    /**
     * Xóa một công việc theo ID
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async deleteJobById(req:Request, res:Response):Promise<void>{
        try {
            const jobId = req.params.id
            if (!jobId || jobId.length!==24){
                res.status(400).json({ error:"Invalid job id!" });
                return ;
            }
            const job = await this.jobService.deleteJobById(jobId);
            if (!job){
                res.status(404).json({ message:`Job with id '${jobId}' not found.` })
                return ;
            }
            res.status(200).json({
                message: 'Công việc đã được xóa thành công.',
                jobId:job?.id
            });
        } catch (error) {
            res.status(404).json({
                error: 'Công việc không tồn tại!'
            });
        }

    }
}