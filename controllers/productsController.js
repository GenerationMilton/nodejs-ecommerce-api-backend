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

// @desc get all products
// @route GET /api/v1/products
// @access Public

export const getProductsController = asyncHandler(async(req, res)=>{
    console.log(req.query);
    //query
    let productQuery = Product.find();
  
    //console.log(products);
    
    //search by name
    if(req.query.name){
        productQuery=productQuery.find({
            name:{$regex: req.query.name, $options:"i"},
        });
    }

      //await the query
      const products= await productQuery;

    res.json({
        status:"success",
        products,
    })
})

