import UserService from '../services/user-service';
import { Request, Response } from 'express';

class UserController {
  private userService: UserService;

  constructor(_userService: UserService) {
    this.userService = _userService;
  }

  async register(req: Request, res: Response) {
    try {
      res.send({ message: 'Registration successful' });
    } catch (error) {
      res.send({ message: 'Server Error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      res.send({ message: 'Login successful' });
    } catch (error) {
      res.send({ message: 'Server Error' });
    }
  }

  async forgotPassword(req: Request, res: Response) {
    try {
      res.send({ message: 'Forgot password mail sent' });
    } catch (error) {
      res.send({ message: 'Server Error' });
    }
  }

  async resetPassword(req: Request, res: Response) {
    try {
      res.send({ message: 'Reset password successful' });
    } catch (error) {
      res.send({ message: 'Server Error' });
    }
  }
}

export default UserController;
