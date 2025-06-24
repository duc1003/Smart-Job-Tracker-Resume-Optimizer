import { Router, Request, Response } from "express";
import { Login, Register } from "../controllers/User.controller";
import { RegisterMiddleware } from "../middlewares/User.middleware";

const router = Router();

router.get("/login", Login);
router.post("/register", Register);

export default router;
