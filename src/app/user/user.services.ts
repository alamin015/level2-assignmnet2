import { TOrders, TUser } from './user.interface';
import { UserModel } from './user.model';

const getAllUsersFromDB = async () => {
  const result = await UserModel.aggregate([
    { $match: {} },
    {
      $project: {
        username: true,
        fullname: true,
        age: true,
        email: true,
        address: true,
      },
    },
  ]);
  return result;
};

const userInsertIntoDB = async (data: TUser) => {
  const result = await UserModel.create(data);
  return result;
};

const getSpecificUserFromDB = async (userId: number) => {
  const result = await UserModel.findOne({ userId }, { password: false });
  return result;
};

const updateUser = async (userId: number, data: string) => {
  // const result = await UserModel.findOneAndUpdate(
  //   { userId },
  //   { $set: { username: data } },
  //   { new: true, runValidators: true }
  // );
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $set: { userName: data } },
    { $project: { password: false } },
  ]);

  return result;
};
const deleteUserFromDB = async (userId: number) => {
  const result = await UserModel.deleteOne({ userId });
  return result;
};

const insertOrderIntoDB = async (userId: number, data: TOrders) => {
  const result = await UserModel.findOneAndUpdate(
    { userId },
    { $push: { order: data } },
    { new: true, runValidators: true },
  );
  return result;
};

const getAllOrders = async (userId: number) => {
  const result = await UserModel.aggregate([
    { $match: { userId } },
    { $project: { order: true } },
  ]);
  return result;
};

const getTotalPrice = async (userId: number) => {
  const result = await UserModel.aggregate([{ $match: { userId } }]);
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
  getTotalPrice,
};
