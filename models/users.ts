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
    required: true
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
const User = mongoose.model('User', userSchema)|| mongoose.model('User', userSchema);
export default User;