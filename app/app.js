import dotenv from "dotenv";

//Call to env variables to connect database string url
dotenv.config();

import express from 'express';
import dbConnect from '../config/dbConnect.js';
import userRoutes from "../routes/usersRoutes.js";

//db connect
dbConnect();
const app = express();


//routes
app.use("/", userRoutes);

//export
export default app;