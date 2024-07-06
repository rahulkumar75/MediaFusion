// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/database.js";

dotenv.config({
    path:'./env'
})

connectDB()

/*  APPROACH: 1 
import mongoose from "mongoose";

import { DB_NAME } from "./constants";

import express from "express";

const app = express();

// Effi function
(async () => {
  try {
    await mongoose.connect(`${process.env.MOONGODB_URL}/${DB_NAME}`);

    app.on("error", (error) => {
      console.log("Error- My app is not able to connect With DB:", error);
      throw error;

    });

    app.listen(process.env.PORT,()=>{
        console.log(`App is listing on Port ${process.env.PORT}`)
    });

  } catch (error) {
    console.log("Error:", error);
    throw error;
  }
})();
*/