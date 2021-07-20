import express from "express";
import { signin, signup } from "../controller/user.js";
import { check } from "express-validator";

const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
export default router;
