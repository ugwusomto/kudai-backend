import express, { Request, Response } from 'express';
import UserController from '../controllers/user-controller';
import UserService from '../services/user-service';
import { validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/user-validator-schema';
import UserDataSource from '../datasources/user-datasource';
import TokenService from '../services/token-service';
import TokenDataSource from '../datasources/token-datasource';

const createUserRoute = () => {
  const router = express.Router();
  const tokenService = new TokenService(new TokenDataSource());
  const userService = new UserService(new UserDataSource());
  const userController = new UserController(userService , tokenService);

  router.post('/register', validator(ValidationSchema.registerSchema), (req: Request, res: Response) => {
    return userController.register(req, res);
  });

  router.post('/login', validator(ValidationSchema.loginSchema), (req: Request, res: Response) => {
    return userController.login(req, res);
  });

  router.post('/forgot-password',validator(ValidationSchema.forgotPasswordSchema), (req: Request, res: Response) => {
    return userController.forgotPassword(req, res);
  });

  router.post('/reset-password', (req: Request, res: Response) => {
    return userController.resetPassword(req, res);
  });

  return router;
};

export default createUserRoute();
