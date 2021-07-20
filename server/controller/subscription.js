import Subscription from "../models/subscription.js";
import User from "../models/user.js";

//get all subscription details
export const getSubscriptions = async (req, res) => {
  try {
    const allSub = await Subscription.find();
    res.status(200).json(allSub);
  } catch (e) {
    res.status(400).json(e);
  }
};

// get active subscription
export const getActiveSubscription = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    res.json({
      activeSubscription: user.subscription,
      expireIn: user.subExpireIn,
    });
  } catch (e) {
    res.status(400).json({
      error: e,
    });
  }
};

// cancel subscription by user
export const cancelSubscription = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { subscription: null, subExpireIn: null },
      {
        new: true,
      }
    );
    res.json(user.subscription);
  } catch (error) {
    res.status(400).json({
      error: error,
    });
  }
};
