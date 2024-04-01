import Db from './index';
import UserModel from '../models/user-model';
import TokenModel from '../models/token-model';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    UserModel.sync({ alter: false });
    TokenModel.sync({ alter: false });

  } catch (error) {
    console.log('Unable to connect to our databse ', error);
  }
};

export default DbInitialize;
