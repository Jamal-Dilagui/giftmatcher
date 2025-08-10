// models/User.js
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: false, // Make it optional since we're using firstName/lastName
    unique: true,
    sparse: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'is invalid']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  googleId: {
    type: String,
    sparse: true
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'https://randomuser.me/api/portraits/lego/1.jpg'
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'dark'
    },
    notificationEnabled: {
      type: Boolean,
      default: true
    }
  },
                savedGifts: [{
                title: String,
                description: String,
                image: String,
                price: String,
                category: String,
                amazonUrl: String,
                savedAt: {
                  type: Date,
                  default: Date.now
                }
              }],
  quizHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizResult'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving (only if password is modified)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  // Only hash if password is not already hashed (for Google users)
  if (!this.password.startsWith('$2a$') && !this.password.startsWith('google-auth-')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  
  // Generate username from email if not provided
  if (!this.username) {
    this.username = this.email.split('@')[0] + '_' + Math.random().toString(36).substring(2, 8);
  }
  
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Clear any existing model to prevent caching issues
if (mongoose.models.User) {
  delete mongoose.models.User;
}

export default mongoose.model('User', userSchema);