import type { Request, Response, NextFunction } from "express";


export const RegisterMiddleware = (req : Request, res : Response, next : NextFunction):void => {
    const { email, password, name} = req.body;
    console.log(email, password, name);
    if (!email || !password || !name) {
        res.status(400).json({message: "Bad Request!"});
        return;
    }

    next();
}