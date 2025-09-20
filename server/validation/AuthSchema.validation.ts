// validation/authSchemas.ts
import { z } from 'zod';

export const registerSchema = z.object({
    email: z.string().email('Email không hợp lệ.').nonempty('Email là bắt buộc.'),
    password: z.string()
        .min(6, 'Mật khẩu phải có ít nhất 8 ký tự.')
        .max(30, 'Mật khẩu không được vượt quá 30 ký tự.')
        .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường.')
        .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa.')
        .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một số.')
        .nonempty('Mật khẩu là bắt buộc.'),
    role: z.enum(['job_seeker', 'recruiter', 'admin'], {
        errorMap: () => ({ message: 'Vai trò không hợp lệ. Chỉ chấp nhận "job_seeker", "recruiter" hoặc "admin".' })
    }),
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự.').max(100, 'Tên không được vượt quá 100 ký tự.').nonempty('Tên là bắt buộc.')
});

export const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ.').nonempty('Email là bắt buộc.'),
    password: z.string().nonempty('Mật khẩu là bắt buộc.')
});


export const updateSchema = z.object({
    email: z.string().email('Email không hợp lệ.').nonempty('Email là bắt buộc.'),
    password: z.string()
        .min(8, 'Mật khẩu phải có ít nhất 8 ký tự.')
        .max(30, 'Mật khẩu không được vượt quá 30 ký tự.')
        .regex(/[a-z]/, 'Mật khẩu phải chứa ít nhất một chữ cái thường.')
        .regex(/[A-Z]/, 'Mật khẩu phải chứa ít nhất một chữ cái hoa.')
        .regex(/[0-9]/, 'Mật khẩu phải chứa ít nhất một số.')
        .nonempty('Mật khẩu là bắt buộc.'),
    role: z.enum(['job_seeker', 'recruiter'], {
        errorMap: () => ({ message: 'Vai trò không hợp lệ. Chỉ chấp nhận "job_seeker" hoặc "recruiter".' })
    }),
    name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự.').max(100, 'Tên không được vượt quá 100 ký tự.').nonempty('Tên là bắt buộc.')
});


// Bạn có thể thêm các schema khác ở đây (ví dụ: đổi mật khẩu, cập nhật profile)