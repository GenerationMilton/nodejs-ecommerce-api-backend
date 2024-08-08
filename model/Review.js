import mongoose from "mongoose";


//schema of mongoose
const Schema = mongoose.Schema;

const ReviewShema = new Schema({
    fullname:{
        type:String,
        required:true,
    },

},{
    timestamps:true,
});

//compile the schema to model
const User= mongoose.model('Review', ReviewSchema);

export default Review;