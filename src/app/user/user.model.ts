import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const fullNameSchema = new Schema({
  firstName: String,
  lastName: String,
});
const addressSchema = new Schema({
  street: String,
  city: String,
  country: String,
});

const userSchema = new Schema({
  userId: Number,
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [],
  address: addressSchema,
});

export const UserModel = model<TUser>('User', userSchema);
