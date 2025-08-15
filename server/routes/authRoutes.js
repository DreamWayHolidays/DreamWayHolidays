import express from "express";
import { Router } from "express";
import {loginController} from "../controllers/authControllers.js";

const router = Router();

// Auth Routes

router.post("/login", loginController);


export default router;