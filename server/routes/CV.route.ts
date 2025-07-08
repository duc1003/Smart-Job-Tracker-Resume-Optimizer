import { Router } from "express";
import { CVController } from "../controllers/CV.controller";



const router = Router();
const cvController = new CVController();

router.post("/upload", cvController.uploadCV); // Route to upload CV
router.get("/:id", cvController.getCVById); // Route to get CV by ID
router.put("/:id", cvController.updateCVById); // Route to update CV by ID
router.delete("/:id", cvController.deleteCVById); // Route to delete CV by ID
router.get("/", cvController.getAllCVs); // Route to get all CVs
router.get("/user/:userId", cvController.getCVsByUserId); // Route to get CVs by user ID
export default router;