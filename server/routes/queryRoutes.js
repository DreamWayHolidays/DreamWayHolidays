import express from "express";
import { Router } from "express";
import {submitQueryController, getQueryController} from "../controllers/queryController.js";

const router = Router();

// Auth Routes

router.post("/submitQuery", submitQueryController);

router.get("/getQuery", getQueryController);


export default router;