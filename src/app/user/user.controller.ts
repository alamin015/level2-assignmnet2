import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { userServices } from './user.services';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'User retrived successfully!',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
      error: {
        code: 500,
        description: 'User not found!',
      },
    });
  }
};

const userCreated = async (req: Request, res: Response) => {
  try {
    const student = req.body;
    const { error, value } = userValidationSchema.validate(student);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Validation error',
        error: {
          code: 500,
          description: error.details,
        },
      });
      return 0;
    }

    // services function call
    const result = await userServices.userInsertIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err.message,
    });
  }
};

export const userController = {
  userCreated,
  getAllUsers,
};
