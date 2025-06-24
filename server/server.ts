import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import { Connect } from "./configs/Connect";

const app: Express = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded


app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  Connect()
    .then(() => console.log("✅ Database connected successfully."))
    .catch((error) => console.error("❌ Database connection failed:", error));
  console.log(`Server is running on http://localhost:${PORT}`);
});