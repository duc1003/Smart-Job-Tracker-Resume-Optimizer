import { Request, Response } from 'express';
import UserModel from '../models/User.model';
import bcrypt from 'bcrypt';


export const Login = async (req : Request, res : Response):Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        if (!user || !user.passwordHash){
            res.status(401).json({ message: 'Invalid email or password' })
            return;
        };

        const isMatch = await bcrypt.compare(password, user.passwordHash);
        if (!isMatch){
            res.status(401).json({ message: 'Invalid email or password' });
            return;
        }

        res.json({ id: user._id, email: user.email, role: user.role,  message: 'Login successfully.' });
    } catch (err) {
        res.status(500).json({ message: 'Login failed' });
    }
};


export const Register = async (req : Request, res : Response):Promise<void> => {
    try{
        const { email, password, name} = req.body;
        const existedUser = await UserModel.findOne({ email });
        if (existedUser){
            res.status(401).json({message : "Email is already existed!"});
            return;
        }
        const password_hash = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            email,
            passwordHash:password_hash,
            name,
            role:"job_seeker"
        })
        
        res.status(200).json(newUser);
    } catch (error) {
        console.error('[Register Error]', error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
    }
};