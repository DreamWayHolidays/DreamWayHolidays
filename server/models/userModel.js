import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        trim : true
    },

    email : {
        type : String,
        required : true,
        unique : true
    },

    password: {
      type: String,
    },

    role : {
        type : String
    }
})


export default mongoose.model("users", userSchema);