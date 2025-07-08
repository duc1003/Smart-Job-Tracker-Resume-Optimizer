import { Router } from "express";
import { ApplicationController } from "../controllers/Application.controller";


const router = Router()
const applicationController = new ApplicationController()

// route for getting all applications
router.get('/', applicationController.getAllApplications)
// route for getting applications by user ID
router.get('/:user_id', applicationController.getApplicationByUserId)
// route for creating a new application
router.post('/', applicationController.createApplication)
// route for getting applications by job ID
router.get('/detail/:application_id', applicationController.getApplicationById)
// route for updating an application by ID
router.put('/:application_id', applicationController.updateApplication)
// route for deleting an application by ID
router.delete('/:application_id', applicationController.deleteApplication)


export default router;