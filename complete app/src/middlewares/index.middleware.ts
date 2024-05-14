import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Schema } from 'yup';
import Utility from '../utils/index.utils';
import { ResponseCode } from '../interfaces/enum/code-enum';
import UserService from '../services/user-service';
import { IUser } from '../interfaces/user-interface';
import { container } from 'tsyringe';
import { UserRoles } from '../interfaces/enum/user-enum';
import { AccountStatus } from '../interfaces/enum/user-enum';

const userService = container.resolve(UserService);

export const validator = (schema: Schema<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      return Utility.handleError(res, error.errors[0], ResponseCode.BAD_REQUEST);
    }
  };
};

export const Auth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? '';
      if (Utility.isEmpty(token)) {
        throw new TypeError('Authorization failed');
      }
      token = token.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY as string) as IUser;
      if (decode && decode.id) {
        const user = await userService.getUserByField({id:(decode.id)})
        if (!user) {
          throw new TypeError('Authorization failed');
        }

        if (user.accountStatus == AccountStatus.DELETED) {
          throw new TypeError('Account does not exist');
        }

        if (user.accountStatus == AccountStatus.SUSPENDED) {
          throw new TypeError('Account suspended');
        }

        if (user.accountStatus == AccountStatus.FROZEN) {
          throw new TypeError('Account frozen');
        }
      }
      req.body.user = decode;
      next();
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.BAD_REQUEST);
    }
  };
};


export const AdminAuth = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let token: string = req.headers.authorization ?? '';
      if (Utility.isEmpty(token)) {
        throw new TypeError('Authorization failed');
      }
      token = token.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_KEY as string) as IUser;
      if (decode && decode.id) {
        const user = await userService.getUserByField({id:(decode.id)})
        if (!user) {
          throw new TypeError('Authorization failed');
        }

        if(user.role !== UserRoles.ADMIN){
          throw new TypeError('Authorization failed');
        }


        if (user.accountStatus == 'DELETED') {
          throw new TypeError('Account does not exist');
        }
      }
      req.body.user = decode;
      next();
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.BAD_REQUEST);
    }
  };
};