import express, { Request, Response } from 'express';
import UserController from '../controllers/user-controller';
import { validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/user-validator-schema';
import { container } from 'tsyringe';

const router = express.Router();

const userController =  container.resolve(UserController);

const createUserRoute = () => {


  router.post('/register', validator(ValidationSchema.registerSchema), (req: Request, res: Response) => {
    return userController.register(req, res);
  });

  router.post('/login', validator(ValidationSchema.loginSchema), (req: Request, res: Response) => {
    return userController.login(req, res);
  });

  router.post('/forgot-password',validator(ValidationSchema.forgotPasswordSchema), (req: Request, res: Response) => {
    return userController.forgotPassword(req, res);
  });

  router.post('/reset-password',validator(ValidationSchema.resetPasswordSchema) ,  (req: Request, res: Response) => {
    return userController.resetPassword(req, res);
  });

  return router;
};

export default createUserRoute();
