import Db from './index';
import UserModel from '../models/user-model';
import TokenModel from '../models/token-model';
import TransactionModel from '../models/transaction-model';
import AccountModel from '../models/account-model';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    UserModel.sync({ alter: false });
    TokenModel.sync({ alter: false });
    AccountModel.sync({alter:false});
    TransactionModel.sync({alter:false});
  } catch (error) {
    console.log('Unable to connect to our databse ', error);
  }
};

export default DbInitialize;
