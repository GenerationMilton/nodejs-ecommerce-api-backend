import express from 'express';

import { createProductController, getProductsController } from '../controllers/productsController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';


const productsRoute = express.Router();

productsRoute.post(
    "/",
    isLoggedIn,
    createProductController
  );
  
productsRoute.get("/",getProductsController);

export default productsRoute;