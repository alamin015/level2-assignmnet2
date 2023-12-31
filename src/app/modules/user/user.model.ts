import { Schema, model } from 'mongoose';
import { ICustom, TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

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

const userSchema = new Schema<TUser, ICustom>({
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

userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.BCRYPT_SALT_ROUNDS)
  );
  next();
});

// myCustom static method
userSchema.statics.isUserExists = async function (userId: number) {
  const result = UserModel.findOne({ userId });
  return result;
};

export const UserModel = model<TUser, ICustom>('User', userSchema);
