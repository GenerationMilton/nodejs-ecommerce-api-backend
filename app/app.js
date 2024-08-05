import dotenv from "dotenv";

//Call to env variables to connect database string url
dotenv.config();

import express from 'express';
import dbConnect from '../config/dbConnect.js';

//db connect
dbConnect();
const app = express();

//export
export default app;