import asyncHandler from "express-async-handler";
import Product from "../model/Product.js";

// @desc Create new product
// @route POST /api/v1/products
// @access Private/Admin

export const createProductController= asyncHandler(async (req, res)=>{
    const{name, description, category, sizes, colors, user, price, totalQty, brand}=
    req.body;

    //product exist
    const productExist = await Product.findOne({name});
    if(productExist){
        throw new Error("Product already Exists");
    }
    //create the product
    const product = await Product.create({
        name,
        description,
        category,
        sizes,
        colors,
        user: req.userAuthId,
        price,
        totalQty,
        brand,
      });
    //push the product into category
    res.json({
        status:"success",
        message: "Product created successfully",
        product,
    });
});

