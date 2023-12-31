import { TOrders, TUser } from './user.interface';
import { UserModel } from './user.model';

const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    { $match: {} },
    {
      $project: {
        _id: false,
        username: true,
        fullname: true,
        age: true,
        email: true,
        address: true
      }
    }
  ]);
  return result;
};

const userInsertIntoDB = async (data: TUser) => {
  const result = await UserModel.create(data);
  const myResult = await UserModel.findOne(
    { _id: result._id },
    { password: false, order: false }
  );
  return myResult;
};

const getSpecificUserFromDB = async (userId: number) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }

  const result = await UserModel.findOne(
    { userId },
    { _id: false, password: false, order: false }
  );
  return result;
};

const updateUser = async (userId: number, data: TUser) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }

  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $set: data },
    {
      new: true,
      runValidators: true,
      projection: { _id: false, password: 0, order: false }
    }
  );

  return result;
};
const deleteUserFromDB = async (userId: number) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const insertOrderIntoDB = async (userId: number, data: TOrders) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }

  // order insert operation
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { order: data } },
    { new: true, runValidators: true }
  );
  return result;
};

const getAllOrders = async (userId: number) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }

  // get all orders operation
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $project: { order: true, _id: false } }
  ]);
  return result;
};

const getTotalPrice = async (userId: number) => {
  // check user exists or not
  if (!(await UserModel.isUserExists(userId))) {
    throw new Error('User Not Found');
  }

  // get Total price calculation/

  const result = await UserModel.aggregate([
    { $match: { userId } },
    {
      $unwind: '$order'
    },
    {
      $group: {
        _id: null,
        totalPrice: {
          $sum: { $multiply: ['$order.price', '$order.quantity'] }
        }
      }
    },
    { $project: { totalPrice: true, _id: false } }
  ]);
  return result;
};

export const userServices = {
  userInsertIntoDB,
  getAllUsersFromDB,
  getSpecificUserFromDB,
  deleteUserFromDB,
  updateUser,
  insertOrderIntoDB,
  getAllOrders,
  getTotalPrice
};
