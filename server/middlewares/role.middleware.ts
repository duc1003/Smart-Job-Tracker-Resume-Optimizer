import { Request, Response, NextFunction } from "express";

/**
 * Middleware kiểm tra role người dùng
 * @param allowedRoles - danh sách các role được phép (ví dụ: ['recruiter'])
 */

export const RoleMiddleware = (allowedRoles: Array<'job_seeker' | 'recruiter'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.body.user;
        if (!user || !user.role) {
            return res.status(403).json({ message: 'Forbidden: User role not found' });
        }
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({ message: 'Forbidden: You do not have permission to access this resource' });
        }

        next();
    }
}