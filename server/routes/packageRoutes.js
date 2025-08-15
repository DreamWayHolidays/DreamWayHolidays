import express from "express";
import { Router } from "express";
import { getPackagesController, createPackageController, deletePackageController, getPackageByIdController } from "../controllers/packageControllers.js";


const router = Router();

router.get("/getPackages", getPackagesController);

router.post("/createPackage", createPackageController);

router.delete("/deletePackage/:id", deletePackageController);

router.get("/getPackage/:pid", getPackageByIdController);


export default router;