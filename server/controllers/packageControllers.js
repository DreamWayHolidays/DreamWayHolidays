import packagetModel from "../models/packageModel.js";
import userModel from "../models/userModel.js";

export const getPackagesController = async (req, res, next) => {
    try {
      const Packages = await packageModel.find().sort({ createdAt: -1 });

      res.status(200).send({
        msg : "Packages fetched successfully",
        success : true,
        Packages,
      });
        
    } catch (error) {
        next(error);
    }
}


export const createPackageController = async (req, res, next) => {
    try {

        const { userId, content } = req.body;

        if (!userId || !content) {
            return res.status(400).send({
                msg: "All fields are required",
                success: false,
            });
        }

        const user = await userModel.findById(userId);

        if (!user) {
          return res.status(404).send({   
                msg: "User not found",
                success: false,
           });
      }

        const newPost = new postModel({
            userId,
            Author : user.name,
            content,
        });

        await newPost.save();

        res.status(201).send({
            msg: "Post created successfully",
            success: true,
            post: newPost,
        });
        
    } catch (error) {
        next(error);
    }
}




export const deletePackageController = async (req, res, next) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.status(400).send({
                msg: "Post ID is required",
                success: false,
            });
        }

        const post = await postModel.findByIdAndDelete(id);

        if (!post) {
            return res.status(404).send({
                msg: "Post not found",
                success: false,
            });
        }

        res.status(200).send({
            msg: "Post deleted successfully",
            success: true,
        });
        
    } catch (error) {
        next(error);
    }
}




export const getPackageByIdController = async (req, res, next) => {
    try {
        const { uid } = req.params;

        if (!uid) {
            return res.status(400).send({
                msg: "User ID is required",
                success: false,
            });
        }

        const userPosts = await postModel.find({ userId: uid }).sort({ createdAt: -1 });

        res.status(200).send({
            msg: "User posts fetched successfully",
            success: true,
            userPosts,
        });
        
    } catch (error) {
        next(error);
    }
}