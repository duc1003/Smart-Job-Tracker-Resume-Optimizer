import { AuthService } from "../services/AuthService";
import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
        // Removed problematic console.log from constructor
    }

    /**
     * Login user
     * @param req - Express request object
     * @param res - Express response object
     */
    public async login(req: Request, res: Response): Promise<void> {
        try {
            // Basic input check (pre-validation middleware if not used)
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required.' });
                return;
            }

            const user = await this.authService.findUserByEmail(email);

            // Using more specific error messages for security (avoiding "user not found" vs "wrong password")
            if (!user || !user.passwordHash) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            const isMatch = await bcrypt.compare(password, user.passwordHash);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid credentials' });
                return;
            }

            // Ensure JWT_SECRET is available at application startup (checked in server.ts)
            const jwtSecret = process.env.JWT_SECRET!; // Non-null assertion is safer if checked at startup

            const token = jwt.sign(
                { id: user._id, email: user.email, role: user.role },
                jwtSecret,
                { expiresIn: "30m" }
            );

            res.json({
                message: 'Login successful.',
                user: { id: user._id, email: user.email, role: user.role },
                token
            });
        } catch (error: any) { // Catching specific errors from AuthService for better response
            console.error("[AuthController][login] Error during login:", error);
            // Example of catching specific errors from AuthService if you throw custom errors
            if (error.message === "Failed to retrieve user due to a server error.") {
                res.status(500).json({ message: "An internal server error occurred during login." });
            }
            res.status(500).json({ message: 'Login failed due to an unexpected error.' });
        }
    }

    /**
     * Register new user
     * @param req - Express request object
     * @param res - Express response object
     */
    public async register(req: Request, res: Response): Promise<void> {
        try {
            // Basic input check (pre-validation middleware if not used)
            const { email, password, role, name } = req.body;
            if (!email || !password || !role || !name) {
                res.status(400).json({ message: 'Email, password, role, and name are all required for registration.' });
                return;
            }

            // You might add basic format validation here if not using a dedicated middleware
            // Example: if (!isValidEmail(email)) { res.status(400).json({ message: 'Invalid email format' }); return; }
            // Example: if (password.length < 8) { res.status(400).json({ message: 'Password must be at least 8 characters long' }); return; }
            // Example: if (!['job_seeker', 'recruiter'].includes(role)) { res.status(400).json({ message: 'Invalid role specified.' }); return; }


            // AuthService now handles checking for existing user and throws a specific error
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

        } catch (error: any) {
            // Catch specific errors thrown by AuthService and map to appropriate HTTP status codes
            if (error.message === "User with this email already exists.") {
                res.status(409).json({ message: error.message }); // 409 Conflict
            }
            if (error.message.startsWith("Validation failed:")) {
                res.status(400).json({ message: error.message }); // 400 Bad Request
            }

            // Log unexpected errors for debugging
            console.error("[AuthController][register] Unexpected error during registration:", error);
            res.status(500).json({ message: 'Registration failed due to an internal server error.' });
        }
    }
}