import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { // Hoặc kiểu dữ liệu chính xác của user object của bạn
        id: string;
        email: string;
        role: 'job_seeker' | 'recruiter' | 'admin'; // Hoặc các role khác
        // ... các thuộc tính khác của user
      };
    }
  }
}

export const isRecruiter = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user; // Lấy thông tin user từ request

    if (!user || !user.role) {
        res.status(403).json({ message: 'Forbidden: User role not found or not authenticated.' });
        return;
    }

    if (user.role !== 'recruiter') {
        res.status(403).json({ message: 'Forbidden: You do not have recruiter privileges to access this resource.' });
        return
    }

    next(); // Cho phép request tiếp tục nếu user là recruiter
};