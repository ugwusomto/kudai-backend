import express, { Request, Response } from 'express';
import UserController from '../controllers/user-controller';
import UserService from '../services/user-service';
import Utility from '../utils/index.utils';

const createUserRoute = () => {
  const router = express.Router();
  const userService = new UserService();
  const userController = new UserController(userService);


  Utility.printRed("POST : /api/user/register")
  router.post('/register', (req: Request, res: Response) => {
    return userController.register(req, res);
  });

  Utility.printRed("POST : /api/user/login")
  router.post('/login', (req: Request, res: Response) => {
    return userController.login(req, res);
  });

  Utility.printRed("POST : /api/user/forgot-password")
  router.post('/forgot-password', (req: Request, res: Response) => {
    return userController.forgotPassword(req, res);
  });

  Utility.printRed("POST : /api/user/reset-password")
  router.post('/reset-password', (req: Request, res: Response) => {
    return userController.resetPassword(req, res);
  });

  return router;
};

export default createUserRoute();
