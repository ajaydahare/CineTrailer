import User from "../models/user.js";

// check subscription purchase date or current date if current date grater then purchase date then cancel subscription
export const isSubscriptionExpire = async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findById(userId);

  if (user.subExpireIn) {
    if (user.subExpireIn?.getTime() < new Date().getTime()) {
      try {
        await User.findByIdAndUpdate(
          userId,
          { subscription: null, subExpireIn: null },
          {
            new: true,
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  }

  next();
};
