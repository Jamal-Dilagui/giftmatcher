// models/QuizResult.js
import mongoose from 'mongoose';

const quizResultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  answers: {
    relationship: {
      type: String,
      enum: ['friend', 'family', 'partner', 'colleague', 'other']
    },
    ageRange: {
      type: String,
      enum: ['child', 'teen', 'young-adult', 'adult', 'senior']
    },
    occasion: {
      type: String,
      enum: ['birthday', 'anniversary', 'holiday', 'graduation', 'other']
    },
    interests: [String],
    budget: {
      type: String,
      enum: ['under-25', '25-50', '50-100', '100-plus']
    }
  },
  recommendedGifts: [{
    gift: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gift'
    },
    matchScore: Number,
    reason: String
  }],
  sessionId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.QuizResult || mongoose.model('QuizResult', quizResultSchema);