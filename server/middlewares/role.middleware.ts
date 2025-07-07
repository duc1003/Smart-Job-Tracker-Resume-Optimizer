import { Request, Response, NextFunction } from "express";

// Bạn cần mở rộng Request interface của Express để thêm thuộc tính user
// nếu bạn đang dùng TypeScript và gán req.user trong middleware xác thực của mình.
// Ví dụ:
declare global {
  namespace Express {
    interface Request {
      user?: { // Hoặc kiểu dữ liệu chính xác của user object của bạn
        id: string;
        email: string;
        role: 'job_seeker' | 'recruiter'; // Hoặc các role khác
        // ... các thuộc tính khác của user
      };
    }
  }
}

/**
 * Middleware kiểm tra xem người dùng hiện tại có phải là 'recruiter' hay không.
 * Giả định thông tin user (bao gồm role) được đính kèm vào req.user sau khi xác thực.
 */
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