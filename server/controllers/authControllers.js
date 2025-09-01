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
        
        const USER = await userModel.findOne({email});

        if(!USER){
            return res.status(400).send({
                msg : "User does not exist",
                success : false
            })
        }

        const isMatch = await comparePassword(password, USER.password);

        if(!isMatch){
            return res.status(400).send({
                msg : "Invalid password",
                success : false
            })
        }

        
        const token = jwt.sign({ _id:   USER._id, role : USER.role },  process.env.JWT_SECRET,  { expiresIn: "7d" } );


        let user = USER.toObject();
        delete user.password; // Remove password from user object

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

