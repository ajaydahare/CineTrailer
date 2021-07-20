import Purchase from "../models/purchase.js";
import User from "../models/user.js";

// create order by user
export const createPurchase = async (req, res) => {
  const { userId } = req.params;
  req.body.purchase.user = req.profile;
  req.body.purchase.paidAt = new Date();
  const newPurchase = new Purchase(req.body.purchase);

  newPurchase.save(async (error, purchase) => {
    if (error) {
      return res.status(400).json({
        error: "failed to place purchase",
      });
    }

    let user = await User.findById(userId);
    user.subscription = purchase.purchaseItem;
    user.subExpireIn = new Date(Date.now() + 60 * 60 * 24 * 30 * 1000);

    let updatedUser = await User.findByIdAndUpdate(userId, user, {
      new: true,
    });
    res.json({
      activeSubscription: updatedUser.subscription,
      expireIn: updatedUser.subExpireIn,
    });
  });
};
