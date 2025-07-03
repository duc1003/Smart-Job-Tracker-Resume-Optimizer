import { Router, Request, Response } from "express";
import { LoginMiddleware, RegisterMiddleware } from "../middlewares/User.middleware";
import { AuthController } from "../controllers/Auth.controller";

const router = Router();
const authController = new AuthController();

router.get("/login", LoginMiddleware, authController.login.bind(authController));
router.post("/register", RegisterMiddleware, authController.register.bind(authController));

export default router;
