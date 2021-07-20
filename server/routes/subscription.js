import express from "express";
import {
  getSubscriptions,
  getActiveSubscription,
  cancelSubscription,
} from "../controller/subscription.js";
import { getUserById } from "../controller/user.js";

import auth from "../middleware/auth.js";
import { isSubscriptionExpire } from "../middleware/subsciption.js";

const router = express.Router();
router.param("userId", getUserById);
router.get("/subscription", getSubscriptions);
router.get(
  "/activepack/:userId",
  auth,
  isSubscriptionExpire,
  getActiveSubscription
);
router.patch("/cancel-subscription/:userId", auth, cancelSubscription);
export default router;
