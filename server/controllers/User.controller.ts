import { Request, Response } from 'express';
import UserModel from '../models/User.model';
import bcrypt from 'bcrypt';


export const Login = (req : Request, res : Response) => {
    res.send(`Login Pageeeeeee ${req.body.email}`);
    console.log(req.body);
};

export const Register = async (req : Request, res : Response):Promise<void> => {
    try{

        console.log(req.body);

        const { email, password, name} = req.body;
        const existedUser = await UserModel.findOne({ email });
        if (existedUser){
            res.status(401).json({message : "Email is already existed!"});
            return;
        }
        const password_hash = await bcrypt.hash(password, 10);
        res.status(200).json({email, password, name, password_hash});
    } catch (error) {
        console.error('[Register Error]', error);
            res.status(500).json({ message: 'Đã có lỗi xảy ra.' });
    }
};