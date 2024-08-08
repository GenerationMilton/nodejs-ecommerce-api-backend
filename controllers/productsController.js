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

    //filter by brand

    if(req.query.brand){
        productQuery=productQuery.find({
            brand:{$regex: req.query.brand, $options:"i"},
        });
    }

    //filter by category

    if(req.query.category){
        productQuery=productQuery.find({
            category:{$regex: req.query.category, $options:"i"},
        });
    }

     //filter by color

     if(req.query.color){
        productQuery=productQuery.find({
            colors:{$regex: req.query.color, $options:"i"},
        });
    }

    //filter by sizes

    if(req.query.size){
    productQuery=productQuery.find({
        sizes:{$regex: req.query.size, $options:"i"},
    });
    }

    //filter by price range
    if(req.query.price){
        const priceRange= req.query.price.split("-");
        //gte: greater or equal
        //lte: less than or equal to
        //console.log(priceRange);
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]},
        });
        
    }

    //await the query
    const products= await productQuery;

    res.json({
        status:"success",
        products,
    })
})

