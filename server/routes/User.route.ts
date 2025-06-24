import { Router, Request, Response } from "express";
import { Login, Register } from "../controllers/User.controller";
import { LoginMiddleware, RegisterMiddleware } from "../middlewares/User.middleware";

const router = Router();

router.get("/login", LoginMiddleware, Login);
router.post("/register", RegisterMiddleware, Register);

export default router;
