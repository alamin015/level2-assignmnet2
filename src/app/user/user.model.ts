import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';

const fullNameSchema = new Schema({
  firstName: String,
  lastName: String
});
const addressSchema = new Schema({
  street: String,
  city: String,
  country: String
});

const orderSchema = {
  productName: String,
  price: Number,
  quantity: Number
};

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: String,
  fullName: {
    type: fullNameSchema,
    _id: false
  },
  age: Number,
  email: String,
  isActive: Boolean,
  hobbies: [String],
  address: {
    type: addressSchema,
    _id: false
  },
  order: {
    type: [orderSchema],
    _id: false
  }
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

export const UserModel = model<TUser>('User', userSchema);
