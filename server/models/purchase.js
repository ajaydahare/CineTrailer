import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema(
  {
    purchaseItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
      required: true,
    },
    paymentResult: {
      id: String,
      status: String,
      amount: Number,
      email_address: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paidAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
