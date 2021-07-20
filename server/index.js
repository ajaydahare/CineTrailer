import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/user.js";
import subscriptionRoutes from "./routes/subscription.js";
import purchaseRoutes from "./routes/purchase.js";
import paymentRoutes from "./routes/payment.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => {
      console.log(`server started on port ${PORT}`);
    })
  )
  .catch((error) => console.log(error));
mongoose.set("useFindAndModify", false);

app.use("/api", userRoutes);
app.use("/api", subscriptionRoutes);
app.use("/api", purchaseRoutes);
app.use("/api", paymentRoutes);

app.get("/", (req, res) => {
  res.send("API for moviehub project");
});
