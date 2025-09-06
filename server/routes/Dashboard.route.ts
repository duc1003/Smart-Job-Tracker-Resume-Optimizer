import { Router } from "express";
import { Dashboard } from "../controllers/Dashboard.controller";
import { validatePerm } from "../middlewares/User.middleware";


const route = Router();

route.get('/', validatePerm, Dashboard);

export default route;
