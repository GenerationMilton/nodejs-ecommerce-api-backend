
// @desc Register user
// @route POST /api/v1/users/register
// @access Private/Admin

import User from "../model/User.js";

//funtion req - res to register user
export const registerUserCtrl = async (req, res) => {
    // res.json({
    //     msg:"User register controller",
    // });

    const {fullname, email, password} = req.body;
    //Check user exist
    const userExist = await User.findOne({email});
    if(userExist){
        //throw
        res.json({
            msg:"User already exist",
        });
    }
    //hash password
    //create the user
    const user = await User.create({
        fullname,
        email,
        password,
    });
    res.status(201).json({
        status:"success",
        message: "User Registered Successfully",
        data:user,
    });

};