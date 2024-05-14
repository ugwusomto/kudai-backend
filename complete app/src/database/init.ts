import Db from './index';
import UserModel from '../models/user-model';
import TokenModel from '../models/token-model';
import TransactionModel from '../models/transaction-model';
import AccountModel from '../models/account-model';
import PayeeModel from '../models/payee-model';
import LoanModel from '../models/loan-model';

const DbInitialize = async () => {
  try {
    await Db.authenticate();
    UserModel.sync({ alter: false });
    TokenModel.sync({ alter: false });
    AccountModel.sync({alter:false});
    TransactionModel.sync({alter:false});
    PayeeModel.sync({alter:false})
    LoanModel.sync({alter:false,hooks:true})
  } catch (error) {
    console.log('Unable to connect to our databse ', error);
  }
};

export default DbInitialize;
