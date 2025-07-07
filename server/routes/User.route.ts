// routes/User.route.ts
import { Router } from 'express';
import { AuthController } from '../controllers/Auth.controller';
import { authMiddleware, authorizeRole } from '../middlewares/Auth.middleware';
import { validate } from '../middlewares/Validation.middleware'; // Import middleware validation
import { loginSchema, registerSchema, updateSchema } from '../validation/AuthSchema.validation'; // Import schemas Zod


const router = Router();
const authController = new AuthController();

// Route Đăng ký (Register)
router.post('/register', validate(registerSchema), authController.register);

// Route Đăng nhập (Login)
router.post('/login', validate(loginSchema), authController.login);

// Route Chỉnh sửa thông tin (Update)
router.put('/update/:id', authMiddleware, validate(updateSchema), authController.update);

// Route Xóa người dùng (Delete)
router.delete('/delete/:id', authMiddleware, authController.delete);

// Route Logout
// router.post('/logout');

export default router;