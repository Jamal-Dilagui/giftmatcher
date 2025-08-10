// models/Gift.js
import mongoose from 'mongoose';

const giftSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 500
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'home', 'fashion', 'books', 'toys', 'experiences', 'other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    required: true
  },
  affiliateLink: {
    type: String,
    required: true
  },
  tags: [{
    type: String,
    trim: true
  }],
  ageRange: {
    min: {
      type: Number,
      min: 0
    },
    max: {
      type: Number,
      min: 0
    }
  },
  popularityScore: {
    type: Number,
    default: 0
  },
  aiDescription: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Gift || mongoose.model('Gift', giftSchema);