import mongoose from "mongoose";

const querySchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true
    },

    email : {
        type : String,
        required : true,
    },

    message: {
      type: String,
    },
}, {timestamps: true});


export default mongoose.model("queries", querySchema);