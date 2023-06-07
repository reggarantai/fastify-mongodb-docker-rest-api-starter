import { Schema } from 'mongoose';

// Create a User schema
const userSchema = new Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'Username required!'],
  },
  password: {
    type: String,
    trim: true,
    required: [true, 'Password required!'],
  },
});

export default userSchema;
