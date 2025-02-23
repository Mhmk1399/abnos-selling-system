import mongoose from "mongoose";
const rewardSchema = new mongoose.Schema({
  saler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: false,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: false,
  },
  price: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  product: [
    {
      type: String,
      required: false,
    },
  ],
  supervisor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Reward || mongoose.model("Reward", rewardSchema);
