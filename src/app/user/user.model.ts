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

const orderSchema = {
  productName: String,
  price: Number,
  quantity: Number,
};

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true,
  },
  username: String,
  password: String,
  fullName: fullNameSchema,
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: addressSchema,
  order: [orderSchema],
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
