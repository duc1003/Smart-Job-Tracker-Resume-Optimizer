import express, { Express, Request, Response } from "express";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();
import { Connect } from "./configs/Connect";
import UserRouter from "./routes/User.route";

const app: Express = express();
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, World!");
});

// ========  TEST JWT TOKEN =================
app.get("/dash", (req: Request, res: Response):void => {
  const authHeader = req.headers.authorization;
  console.log(authHeader);
  if (!authHeader || !authHeader.startsWith('Bearer ')){
    res.status(401).json({error: "You is not Login!"})
    return ;
  }
  res.send("DASHHHH");
});
// ===========================================

app.use('/api/users', UserRouter);

app.listen(PORT, () => {
  Connect()
    .then(() => console.log("✅ Database connected successfully."))
    .catch((error) => console.error("❌ Database connection failed:", error));
  console.log(`Server is running on http://localhost:${PORT}`);
});