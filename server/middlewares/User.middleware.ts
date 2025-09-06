import type { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


export const RegisterMiddleware = (req : Request, res : Response, next : NextFunction):void => {
    const { email, password, name} = req.body;
    // console.log(email, password, name);
    if (!email || !password || !name) {
        res.status(400).json({message: "Bad Request!"});
        return;
    }

    next();
}

export const LoginMiddleware = (req : Request, res : Response, next : NextFunction):void => {
    const { email, password, name} = req.body;
    // console.log(email, password, name);
    if (!email || !password) {
        res.status(400).json({message: "Bad Request!"});
        return;
    }

    next();
}


interface AuthenticatedRequest extends Request {
    decodedAuth?: string | JwtPayload;
}
export const validatePerm = (req:AuthenticatedRequest, res:Response, next:NextFunction):void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')){
        res.status(401).json({error: "Access denied. No valid authencation token provided!"});
        return;
    }

    const token = authHeader.split(' ')[1];
    if (!token){
        res.status(401).json({
            error: "Access denied. Invalid token format!"
        });
        return;
    }

    try {
        const decodedAuth = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.decodedAuth = decodedAuth;
        next();
    } catch (error) {
        res.status(401).json({error: "Your session is expired or invalid!"})
        // console.log(error);
        return ;
    }
}