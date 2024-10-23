import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";
config();
const app = express();
//middlewares
app.use(cors({
    origin: process.env.ORIGIN, // Allow requests from localhost:5173
    credentials: true, // Allow credentials (cookies, authentication)
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Define allowed methods
    allowedHeaders: "Content-Type,Authorization", // Define allowed headers
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
//remove it in production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);
export default app;
//# sourceMappingURL=app.js.map