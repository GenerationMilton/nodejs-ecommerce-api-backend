import dotenv from "dotenv";

//Call to env variables to connect database string url
dotenv.config();

import express from 'express';
import dbConnect from '../config/dbConnect.js';
import { globalErrorHandler } from "../middlewares/globalErrorHandler.js";
import userRoutes from "../routes/usersRoutes.js";


//db connect
dbConnect();
const app = express();

//pass incoming data
app.use(express.json());

//routes
app.use("/", userRoutes);

//err middleware
app.use(globalErrorHandler);
//export
export default app;