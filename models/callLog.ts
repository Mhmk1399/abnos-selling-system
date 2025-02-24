import mongoose from "mongoose";

const callLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  comment: {
    type: String,
    required: false,
  },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    type:{
        type: String,
        required: false,
        enum: ['priceAsker', 'order', 'support'],
        default: 'priceAsker'
    },
    followUp:[{
        date:{
            type: Date,
            required: false
        },
        info:{
            type: String,
            required: false
        },
        time:{
            type: String,
            required: false
        }
    }]
    
});
export default mongoose.models.CallLog || mongoose.model("CallLog", callLogSchema);