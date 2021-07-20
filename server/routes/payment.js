import express from "express";
import { makePayment } from "../controller/payment.js";

const router = express.Router();

router.post("/payment", makePayment);

export default router;
