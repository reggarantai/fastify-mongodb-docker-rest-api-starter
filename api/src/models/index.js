import mongoose from 'mongoose';
import { userMongooseSchema } from './userSchema.js';

// Create a User model
const User = mongoose.model('User', userMongooseSchema);

export {
  User,
};
