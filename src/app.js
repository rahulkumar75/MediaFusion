import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Cors Configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); 

// Middleware Configuration
app.use(express.json({limit:"16kb"}))   
app.use(express.urlencoded({extented:true, limit:"16kb"}))  // app.use(express.urlencoded()) also valid.
app.use(express.static("public"))   // in public folder Store jpg, pdf..
app.use(cookieParser()) // apne server se, apply curd operation on user's Browser Cookies

export { app };
