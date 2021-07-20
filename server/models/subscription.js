import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
