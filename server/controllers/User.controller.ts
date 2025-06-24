import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../models/User.model';


export const Login = (req : Request, res : Response) => {
    res.send(`Login Pageeeeeee ${req.body.email}`);
    console.log(req.body);
};

export const Register = async (req : Request, res : Response):Promise<void> => {
    try{
        res.send('Register Pageeeeeee');
        console.log(req.body);

        const { email, password, name} = req.body;
        const existtedUser = await UserModel.findOne({ email });
        if (existtedUser){
            res.status(401).json({message : "Email is already existed!"});
            return;
        }
        const password_hash = bcrypt.hash(password, 20)
        res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
    } catch (error) {
        console.error('[Register Error]', error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
    }
};