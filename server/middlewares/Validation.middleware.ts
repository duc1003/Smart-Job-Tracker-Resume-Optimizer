// middlewares/validationMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

export const validate = (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // Sử dụng .parse() để Zod tự động ném lỗi nếu validation thất bại
            schema.parse(req.body);
            next();
        } catch (error: any) {
            if (error instanceof ZodError) {
                // Trích xuất thông báo lỗi từ Zod
                const messages = error.errors.map(err => err.message);
                res.status(400).json({
                    message: 'Dữ liệu đầu vào không hợp lệ.',
                    errors: messages
                });
                return 
            }
            console.error("[ValidationMiddleware] Unexpected error:", error);
            res.status(500).json({ message: 'Lỗi server khi xác thực dữ liệu.' });
            return 
        }
    };