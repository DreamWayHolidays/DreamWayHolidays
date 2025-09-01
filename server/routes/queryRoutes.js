import express from "express";
import { Router } from "express";
import {submitQueryController, getQueryController, deleteQueryController} from "../controllers/queryController.js";
import { requireSignin } from "../middlewares/requireSignIn.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const router = Router();

// Auth Routes

router.post("/submitQuery", submitQueryController);

router.get("/getQuery", getQueryController);

router.delete("/deleteQuery/:qid", requireSignin, isAdmin, deleteQueryController);


export default router;