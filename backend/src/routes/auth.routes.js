import express from "express";
import { register, login, createAdmin } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create-admin", createAdmin); // Should be protected in real app, but for now we trust the controller logic or add middleware later

export default router;
