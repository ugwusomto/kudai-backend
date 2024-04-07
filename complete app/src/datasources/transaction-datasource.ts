import { FindOptions } from 'sequelize';
import { IFindTransactionQuery, ITransaction, ITransactionCreationBody, ITransactionDataSource } from '../interfaces/transaction-interface';
import TransactionModel from '../models/transaction-model';

class TransactionDataSource implements ITransactionDataSource {
  async create(record: ITransactionCreationBody): Promise<ITransaction> {
    return await TransactionModel.create(record,{returning:true});
  }

  async fetchOne(query: IFindTransactionQuery): Promise<ITransaction | null> {
    return await TransactionModel.findOne(query);
  }

  async fetchAll(query: FindOptions<ITransaction>): Promise<ITransaction[]> {
    return await TransactionModel.findAll(query)
  }

  async updateOne(data: Partial<ITransaction> , query: IFindTransactionQuery) : Promise<void>{
    await TransactionModel.update(data , query);
  }

}

export default TransactionDataSource;
