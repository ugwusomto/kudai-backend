import { FindOptions } from 'sequelize';
import { IFindTransactionQuery, ITransaction, ITransactionCreationBody, ITransactionDataSource } from '../interfaces/transaction-interface';
import TransactionModel from '../models/transaction-model';

class TransactionDataSource implements ITransactionDataSource {
  
  
  async create(record: ITransactionCreationBody , options?: Partial<IFindTransactionQuery>): Promise<ITransaction>{
    return await TransactionModel.create(record,{returning:true , ...options});
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

  async fetchSum(field: keyof ITransaction,query: IFindTransactionQuery) : Promise<number>{
    return await TransactionModel.sum(field,query);
  }

}

export default TransactionDataSource;
