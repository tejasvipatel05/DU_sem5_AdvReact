import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['hair', 'nails', 'facial', 'massage', 'waxing', 'makeup', 'spa']
  },
  duration: {
    type: Number,
    required: true // in minutes
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  staffRequired: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Service', serviceSchema);