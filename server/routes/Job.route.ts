import { Router } from "express";
import { JobController } from "../controllers/Job.controller";
import { isRecruiter } from "../middlewares/role.middleware";


const router = Router();
const jobController = new JobController();

// Route job recruitment
router.post("/create", isRecruiter, jobController.createJob);

// Route get all jobs
router.get("/", jobController.getAllJobs);

// Route get job by id
router.get("/:id", isRecruiter, jobController.getJobById);

// Route update job by id
router.put("/:id", isRecruiter, jobController.updateJobById);

// Route delete job by id
router.delete("/:id", isRecruiter, jobController.deleteJobById);

export default router;