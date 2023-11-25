import { Request, Response } from 'express';
import userValidationSchema from './user.validation';
import { userServices } from './user.services';

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'User retrived successfully!',
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err,
      error: {
        code: 500,
        description: 'User not found!'
      }
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
          description: error.details
        }
      });
      return 0;
    }

    // services function call
    const result = await userServices.userInsertIntoDB(value);
    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong!',
      error: err.message
    });
  }
};

const getSpecificUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.userId);
    const result = await userServices.getSpecificUserFromDB(id);

    res.status(200).json({
      success: true,
      message: 'Single User Found',
      data: result
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: err.message
      }
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    await userServices.deleteUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message
      }
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const data = req.body;
    const { error, value } = userValidationSchema.validate(data);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'Validation error',
        error: {
          code: 500,
          description: error.details
        }
      });
      return 0;
    }
    const result = await userServices.updateUser(userId, value);

    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message
      }
    });
  }
};

const insertOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const data = req.body;
    await userServices.insertOrderIntoDB(userId, data);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: null
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message
      }
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getAllOrders(userId);

    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message
      }
    });
  }
};
const getTotalPrice = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const result = await userServices.getTotalPrice(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result[0]
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: {
        code: 500,
        description: error.message
      }
    });
  }
};

export const userController = {
  userCreated,
  getAllUsers,
  getSpecificUser,
  deleteUser,
  updateUser,
  insertOrder,
  getAllOrder,
  getTotalPrice
};
