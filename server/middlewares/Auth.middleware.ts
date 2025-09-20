// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Mở rộng kiểu Request để bao gồm thuộc tính 'user'
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                role: 'job_seeker' | 'recruiter' | 'admin';
            };
            file?: Express.Multer.File;
        }
    }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Định dạng: "Bearer <TOKEN>"

    if (!token) {
        res.status(401).json({ message: 'Truy cập bị từ chối: Không có token được cung cấp.' });
        return;
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        console.error("FATAL ERROR: JWT_SECRET không được định nghĩa trong biến môi trường.");
        res.status(500).json({ message: 'Lỗi cấu hình máy chủ: JWT secret không tìm thấy.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as {
            id: string;
            email: string;
            role: 'job_seeker' | 'recruiter' | 'admin';
            iat: number;
            exp: number;
        };

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role
        };

        next(); // Tiếp tục đến middleware/route tiếp theo
    } catch (error: any) {
        if (error.name === 'TokenExpiredError') {
            res.status(401).json({ message: 'Truy cập bị từ chối: Token đã hết hạn.' });
            return;
        }
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({ message: 'Truy cập bị từ chối: Token không hợp lệ.' });
            return;
        }
        console.error("[AuthMiddleware] Lỗi xác thực token:", error);
        res.status(500).json({ message: 'Đã xảy ra lỗi xác thực không mong muốn.' });
        return;
    }
};

export const authorizeRole = (requiredRoles: Array<'job_seeker' | 'recruiter' | 'admin'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!req.user) {
            // Điều này không nên xảy ra nếu authMiddleware chạy trước
            res.status(403).json({ message: 'Truy cập bị từ chối: Người dùng chưa được xác thực.' });
            return;
        }

        if (!requiredRoles.includes(req.user.role)) {
            res.status(403).json({ message: 'Truy cập bị từ chối: Bạn không có vai trò cần thiết.' });
            return;
        }

        next();
    };
};