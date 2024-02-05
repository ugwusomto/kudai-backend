import { Optional, Model } from 'sequelize';

export interface IUser {
  id: string;
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  isEmailVerified: string;
  accountStatus: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserCreationBody extends Optional<IUser, 'id' | 'createdAt' | 'updatedAt'> {}

export interface IUserModel extends Model<IUser, IUserCreationBody>, IUser {}
