import express from "express";
import { register, login, createAdmin , updateProfile } from "../controllers/auth.controller.js";
import { getMe } from "../controllers/auth.controller.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/create-admin", createAdmin); // Should be protected in real app, but for now we trust the controller logic or add middleware later
router.get("/me", protect, getMe);
router.put("/update-profile",  updateProfile);

export default router;
