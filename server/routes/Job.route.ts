import { Router } from "express";
import { JobController } from "../controllers/Job.controller";


const router = Router();
const jobController = new JobController();

// Route job recruitment
router.post("/create", jobController.createJob);

// Route get all jobs
router.get("/", jobController.getAllJobs);

// Route get job by id
router.get("/:id", jobController.getJobById);

// Route update job by id
router.put("/:id", jobController.updateJobById);

// Route delete job by id
router.delete("/:id", jobController.deleteJobById);

export default router;