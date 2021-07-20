import express from "express";
import { createPurchase } from "../controller/purchase.js";
import { getUserById } from "../controller/user.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.param("userId", getUserById);

router.post("/purchase/create/:userId", auth, createPurchase);

export default router;
