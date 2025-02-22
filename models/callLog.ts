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
    required: true,
  },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    type:{
        type: String,
        required: true,
        enum: ['priceAsker', 'order', 'support'],
        default: 'priceAsker'
    },
    followUp:[{
        date:{
            type: Date,
            required: true
        },
        info:{
            type: String,
            required: true
        },
        time:{
            type: String,
            required: true
        }
    }]
    
});
const CallLog = mongoose.model("CallLog", callLogSchema)|| mongoose.model("CallLog", callLogSchema);
export default CallLog;