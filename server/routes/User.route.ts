// routes/User.route.ts
import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';
import { authMiddleware, authorizeRole } from '../middlewares/Auth.middleware';
import { validate } from '../middlewares/Validation.middleware'; // Import middleware validation
import { loginSchema, registerSchema } from '../validation/AuthSchema.validation'; // Import schemas Zod

const router = Router();
const authController = new AuthController();

// Route Đăng ký (Register)
router.post('/register', validate(registerSchema), authController.register);

// Route Đăng nhập (Login)
router.get('/login', validate(loginSchema), authController.login);
export default router;