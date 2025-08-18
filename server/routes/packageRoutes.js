import express from "express";
import { Router } from "express";
import {
  getPackagesController,
  createPackageController,
  deletePackageController,
  getPackageByIdController,
  updatePackageController,
  createReviewController,
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



export default router;
