import mongoose from 'mongoose';
import userSchema from './userSchema.js';

// Create a User model
const User = mongoose.model('User', userSchema);

export {
  User,
};
