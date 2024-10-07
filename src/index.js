// require('dotenv').config({path: './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connection Failed !!! ", error);
  });

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
