
// @desc Register user
// @route POST /api/v1/users/register
// @access Private/Admin

import bcrypt from "bcryptjs";
import asyncHandler from 'express-async-handler';
import User from "../model/User.js";
import generateToken from "../utils/generateToken.js";
import { getTokenFromHeader } from "../utils/getTokenFromHeader.js";
import { verifyToken } from "../utils/verifyToken.js";


//funtion req - res to register user
export const registerUserCtrl = asyncHandler(async (req, res) => {
 
    const {fullname, email, password} = req.body;
    //Check user exist
    const userExist = await User.findOne({email});
    if(userExist){
        //throw
        throw new Error("User already exists");
    }


    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);



    //create the user
    const user = await User.create({
        fullname,
        email,
        password:hashedPassword,
    });
    res.status(201).json({
        status:"success",
        message: "User Registered Successfully",
        data:user,
    });

});

// @desc Login user
// @route POST /api/v1/users/login
// @access public

export const loginUserCtrl = asyncHandler(async (req,res)=>{
    const{email, password} = req.body;

    //Find the user in db by email only
    const userFound = await User.findOne({
        email,
    });
    if(userFound && await bcrypt.compare(password, userFound?.password)){
        res.json({
            status:'success',
            message:'User logged in successfully',
            userFound,
            token: generateToken(userFound?._id),
        })
    }else{
        throw new Error("Invalid login credentials");
    }
  


});


// @desc user profile
// @route GET /api/v1/users/profile
// @access Private
export const getUserProfileCtrl = asyncHandler(async(req,res)=>{
   
    const token = getTokenFromHeader(req);
    //verify token
    const verified = verifyToken(token);
    console.log(req);


    res.json({
        msg:"Welcome Profile page",
    });
});