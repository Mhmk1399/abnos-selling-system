import mongoose from 'mongoose';
import { start } from 'repl';
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
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    amount:{
        type: String,
        required: false,
    },
    price:{
        type: String,    
        required: false,
    },
    city:{
        type: String,
        required: false,
    },
    product:[
        {
            type: String,
            required: false,
        }
    ],
    supervisor:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }

});
const Target = mongoose.model('Target', targetSchema)|| mongoose.model('Target', targetSchema);
export default Target;