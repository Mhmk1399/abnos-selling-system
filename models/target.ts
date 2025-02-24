import { time } from "console";
import mongoose from "mongoose";
const targetSchema = new mongoose.Schema({
  saler: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
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
  timestamp: { type: Date, default: Date.now },
});
export default mongoose.models.Target || mongoose.model("Target", targetSchema);
