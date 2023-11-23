import express from 'express';
import { userController } from './user.controller';

const router = express.Router();

router.get('/users', userController.getAllUsers);
router.post('/users', userController.userCreated);

export const userRouter = {
  router,
};
