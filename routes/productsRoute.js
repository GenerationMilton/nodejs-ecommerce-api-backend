import express from 'express';

import { createProductController } from '../controllers/productsController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const productsRoute = express.Router();

productsRoute.post(
    "/",
    isLoggedIn,
    createProductController
  );

export default productsRoute;