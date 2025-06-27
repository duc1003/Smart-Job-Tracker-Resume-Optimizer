import type { Request, Response } from "express";

export const Dashboard = async (req:Request, res:Response) => {
    res.status(200).json({message: "This messaage come from dashboard controller."})
}