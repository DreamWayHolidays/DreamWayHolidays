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

const router = Router();

router.get("/getPackages", getPackagesController);

router.post("/createPackage", createPackageController);

router.delete("/deletePackage/:id", deletePackageController);

router.get("/getPackage/:pid", getPackageByIdController);

router.put("/updatePackage/:pid", updatePackageController);

router.post("/:pid/createReview", createReviewController);

export default router;
