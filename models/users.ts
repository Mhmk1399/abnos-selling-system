import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role:  {
    type: String,
    required: true,
    enum: ['saler', 'supervisor', 'manager', 'superAdmin'],
    default: 'saler'
  },
  phone: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
    created: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    info:[{
        type: String,
        required: false
    }]
});
export default mongoose.models.User || mongoose.model('User', userSchema);