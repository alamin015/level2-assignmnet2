import { TUser } from './user.interface';
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

export const userServices = {
  userInsertIntoDB,
  getAllUsersFromDB,
};
