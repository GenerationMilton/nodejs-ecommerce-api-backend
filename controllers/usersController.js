
// @desc Register user
// @route POST /api/v1/users/register
// @access Private/Admin

//funtion req - res to register user
export const registerUserCtrl = async (req, res) => {
    res.json({
        msg:"User register controller",
    });
};