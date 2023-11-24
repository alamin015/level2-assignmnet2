import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.userCreated);
router.get('/users/:userId', userController.getSpecificUser);
router.get('/users/:userId/orders', userController.getAllOrder);
router.get('/users/:userId/orders/total-price', userController.getTotalPrice);
router.put('/users/:userId', userController.updateUser);
router.put('/users/:userId/orders', userController.insertOrder);
router.delete('/users/:userId', userController.deleteUser);

export const userRouter = {
  router
};
