import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const loginController = async(req, res, next) =>{
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).send({
                msg : "All fields are required",
                success : false, 
            })
        }
        
        const user = await userModel.findOne({email});

        if(!user){
            return res.status(400).send({
                msg : "User does not exist",
                success : false
            })
        }

        const isMatch = await comparePassword(password, user.password);

        if(!isMatch){
            return res.status(400).send({
                msg : "Invalid password",
                success : false
            })
        }

        const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET,  { expiresIn: "7d" } );

        return res.status(200).send({
            success : true,
            msg : "Login Successfully",
            user,
            token
        })
    
    } catch (error) {
       next(error);
    }
}

