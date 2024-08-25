import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Middleware Configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // Corrected spelling of extended
app.use(express.static("public"));
app.use(cookieParser());

// Routes import
import userRouter from "./routes/user.routes.js";

// Routes declaration
app.use('/api/v1/users', userRouter);   //https:localhost:8080/api/v1/users/register

// Export the app
export { app };
