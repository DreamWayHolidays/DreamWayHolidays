import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true
    },

}, {timestamps: true});


export default mongoose.model("categories", categorySchema);