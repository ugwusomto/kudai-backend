import { query } from 'express';
import { IFindAccountQuery, IAccount, IAccountCreationBody, IAccountDataSource } from '../interfaces/account-interface';
import AccountModel from '../models/account-model';
import { FindOptions } from 'sequelize';

class AccountDataSource implements IAccountDataSource {
  async create(record: IAccountCreationBody): Promise<IAccount> {
    return await AccountModel.create(record);
  }

  async fetchOne(query: IFindAccountQuery): Promise<IAccount | null> {
    return await AccountModel.findOne(query);
  }

  async   updateOne(searchBy:IFindAccountQuery , data:Partial<IAccount>):Promise<void>{
     await AccountModel.update(data , searchBy);
  }

  async fetchAll(query:FindOptions<IAccount>) : Promise<IAccount[]>{
    return await AccountModel.findAll(query);
  }

}

export default AccountDataSource;
