import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createIssue, requestFunds, approveFunds, getAllIssues } from "../controllers/issue.controller.js";
import { getIssueById } from "../controllers/issue.controller.js";
import { getMyIssues } from "../controllers/issue.controller.js";



const router = express.Router();

router.post("/create", protect, createIssue);
router.post("/request-funds", protect, requestFunds);
router.post("/approve-funds", protect, approveFunds);
router.get("/all", protect, getAllIssues);
router.get("/my-issues", protect, getMyIssues);

router.get("/:id", protect, getIssueById);


export default router;
