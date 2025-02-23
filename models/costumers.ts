import mongoose from 'mongoose';

const costumersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phones: [{
    type: String,
    required: true,
  }],
  personalInfo: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    required: true,
    enum: ['presenter', 'individual', 'company'],
    default: 'individual'
  },
  address: [{
    type: String,
    required: true,
    trim: true
  }],
  city: {
    type: String,
    required: true,
    trim: true
  },
  comments: [{
    type: String,
    trim: true
  }],
  created: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  workers: [{
    name: { type: String, required: true },
    phone: { 
      type: String,
      required: true,
    },
    position: { type: String, required: true }
  }],
  invoices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invoice'
  }]
});


export default mongoose.models.Costumer || mongoose.model('Costumer', costumersSchema);

