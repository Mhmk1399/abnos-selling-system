import mongoose from "mongoose";

const customersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phones: [
    {
      type: String,
      required: false,
    },
  ],
  personalInfo: [
    {
      type: String,
      trim: true,
    },
  ],
  type: {
    type: String,
    required: true,
    enum: ["presenter", "individual", "company"],
    default: "individual",
  },
  address: [
    {
      type: String,
      required: false,
      trim: true,
    },
  ],
  city: {
    type: String,
    required: false,
    trim: true,
  },
  comments: [
    {
      type: String,
      trim: true,
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
  workers: [
    {
      name: { type: String, required: false },
      phone: {
        type: String,
        required: false,
      },
      position: { type: String, required: false },
    },
  ],
  invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
    },
  ],
});

export default mongoose.models.Customers ||
  mongoose.model("Customers", customersSchema);
