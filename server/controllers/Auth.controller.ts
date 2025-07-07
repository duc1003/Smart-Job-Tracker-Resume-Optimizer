// controllers/Auth.controller.ts
import { AuthService } from "../services/Auth.service";
import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Đảm bảo JWT_SECRET được kiểm tra khi khởi động server
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined. Please set it in your .env file.");
    // Trong môi trường sản phẩm, bạn có thể thoát ứng dụng ở đây.
    // process.exit(1);
}

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        // Bind các phương thức để đảm bảo 'this' context đúng
        this.login = this.login.bind(this);
        this.register = this.register.bind(this);
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    /**
     * Đăng nhập người dùng
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async login(req: Request, res: Response): Promise<void> {
        try {
            // Dữ liệu đã được validate bởi validationMiddleware
            const { email, password } = req.body;

            const user = await this.authService.findUserByEmail(email);

            if (!user || !user.passwordHash) {
                res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ.' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                res.status(401).json({ message: 'Thông tin đăng nhập không hợp lệ.' });
                return;
            }

            if (!JWT_SECRET) {
                console.error("[AuthController][login] JWT_SECRET bị thiếu trong quá trình tạo token.");
                res.status(500).json({ message: 'Lỗi máy chủ: JWT secret chưa được cấu hình.' });
                return;
            }
            // req.user = user;

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                JWT_SECRET,
                { expiresIn: "5h" }
            );

            res.json({
                message: 'Đăng nhập thành công.',
                user,
                token
            });

        } catch (error: any) {
            console.error("[AuthController][login] Lỗi trong quá trình đăng nhập:", error);
            // AuthService ném lỗi cụ thể, chúng ta có thể bắt và xử lý tương ứng
            if (error.message === "Failed to retrieve user due to a server error.") {
                res.status(500).json({ message: "Đã xảy ra lỗi máy chủ nội bộ khi tìm kiếm người dùng." });
                return;
            }
            res.status(500).json({ message: 'Đăng nhập thất bại do lỗi máy chủ không mong muốn.' });
        }
    }

    /**
     * Đăng ký người dùng mới
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async register(req: Request, res: Response): Promise<void> {
        try {
            // Dữ liệu đã được validate bởi validationMiddleware
            const { email, password, role, name } = req.body;

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser: IUser = await this.authService.createUser({
                email,
                passwordHash,
                role,
                name
            });

            res.status(201).json({
                message: 'Người dùng đã được tạo thành công.',
                user: { id: newUser._id, email: newUser.email, role: newUser.role, name: newUser.name }
            });

        } catch (error: any) {
            // Xử lý các loại lỗi cụ thể từ AuthService
            if (error.message === "User with this email already exists.") {
                res.status(409).json({ message: error.message }); // 409 Conflict
                return;
            }
            if (error.message.startsWith("Validation failed:")) {
                res.status(400).json({ message: error.message }); // 400 Bad Request (lỗi validation từ Mongoose)
                return;
            }

            console.error("[AuthController][register] Lỗi không mong muốn trong quá trình đăng ký:", error);
            res.status(500).json({ message: 'Đăng ký thất bại do lỗi máy chủ nội bộ.' });
        }
    }

    /**
     * Cập nhật thông tin người dùng
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async update(req: Request, res: Response): Promise<void> {
        if (!req.user || !req.user.id){
            res.status(401).json({ error: 'Truy cập bị từ chối. Phải đăng nhập!' });
            return ;
        }
        // get user id from decoded jwt
        const userIdFromToken = req.user.id;
        
        // get user id from params
        const userIdFromParam = req.params.id;
        if (!userIdFromParam){
            res.status(400).json({ error:"Id is required!" });
            return ;
        }
        if (userIdFromToken !== userIdFromParam){
            res.status(400).json({ error:"You don't have permission to access data on this site!" });
            return ;
        }

        try {
            const updateUser = await this.authService.updateUser(userIdFromParam, req.body);
            
            res.status(200).json({
                massage: "Update successfully.",
                updateUser: updateUser
            });
            return ;
        } catch (error:any) {
            console.log(error)
            if (error.message === "DUPLICATE_EMAIL"){
                res.status(400).json({ error: "Email is already existed!" });
                return ;
            }
            res.status(404).json({
                massage: "Invalid Id!",
            });
            return ;
        }
    }

    /**
     * Xóa người dùng
     * @param req - Đối tượng request của Express
     * @param res - Đối tượng response của Express
     */
    public async delete(req: Request, res: Response): Promise<void>{
        if (!req.user || !req.user.id){
            res.status(401).json({ error: 'Truy cập bị từ chối. Phải đăng nhập!' });
            return ;
        }
        // get user id from decoded jwt
        const userIdFromToken = req.user.id;
        
        // get user id from params
        const userIdFromParam = req.params.id;
        if (!userIdFromParam){
            res.status(400).json({ error:"Id is required!" });
            return ;
        }
        if (userIdFromToken !== userIdFromParam){
            res.status(400).json({ error:"You don't have permission to access data on this site!" });
            return ;
        }

        try {
            const deletedUser = await this.authService.deleteUser(userIdFromParam);
            res.status(200).json({
                massage: "Delete successfully.",
                deletedUser: deletedUser
            });
            return ;
        } catch (error) {
            res.status(404).json({ error : "Can not found user!" });
        }
    }
}