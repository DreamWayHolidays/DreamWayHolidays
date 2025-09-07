import express from "express";
import { Router } from "express";
import {
  getPackagesController,
  createPackageController,
  deletePackageController,
  getPackageByIdController,
  updatePackageController,
  createReviewController,
  createCategoryController,
  getCategoriesController,
  deleteCategoryController
} from "../controllers/packageControllers.js";
import { requireSignin } from "../middlewares/requireSignIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

router.get("/getPackages", getPackagesController);

router.post("/createPackage", requireSignin, isAdmin, createPackageController);

router.delete("/deletePackage/:id",requireSignin, isAdmin,deletePackageController);

router.get("/getPackage/:pid", getPackageByIdController);

router.put("/updatePackage/:pid", requireSignin, isAdmin, updatePackageController);

router.post("/:pid/createReview", createReviewController);

router.post("/createCategory", requireSignin, isAdmin,  createCategoryController);

router.get("/getCategories", getCategoriesController);

router.delete("/deleteCategory/:cid", requireSignin, isAdmin, deleteCategoryController);



export default router;
