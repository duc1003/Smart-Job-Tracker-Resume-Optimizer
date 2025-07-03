import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }
    /**
     * Login user
     * @param req - Express request object
     * @param res - Express response object
     */

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;
            const user = await this.authService.findUserByEmail(email);

            if (!user || !user.passwordHash) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid email or password' });
                return;
            }

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: "30m" }
            );

            res.json({
                message: 'Login successfully.',
                user: { id: user._id, email: user.email, role: user.role },
                token
            });
        } catch (err) {
            res.status(500).json({ message: 'Login failed' });
        }
    }
    /**
     * Register new user
     * @param req - Express request object
     * @param res - Express response object
     */
    public async register(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, role, name } = req.body;
            const existedUser = await this.authService.findUserByEmail(email);

            if (existedUser) {
                res.status(401).json({ message: "Email is already existed!" });
                return;
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const newUser: IUser = await this.authService.createUser({
                email,
                passwordHash,
                role,
                name
            });

            res.status(201).json({
                message: 'User created successfully',
                user: { id: newUser._id, email: newUser.email, role: newUser.role }
            });
        } catch (err) {
            res.status(500).json({ message: 'Registration failed' });
        }
    }
}