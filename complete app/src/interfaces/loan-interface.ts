import { Optional, Model, FindOptions, Transaction } from 'sequelize';

export interface ILoan {
  id: string;
  userId: string;
  accountId: string;
  amount: number;
  interest: number;
  status: string; // PENDING , ACTIVE , DENIED 
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindLoanQuery {
  where: {
    [key: string]: string;
  };
  transaction?: Transaction;
  raw?: boolean;
  returning?: boolean;
}


export interface ILoanCreationBody extends Optional<ILoan, 'id' | 'createdAt' | 'updatedAt'> { }

export interface ILoanModel extends Model<ILoan, ILoanCreationBody>, ILoan { }

export interface ILoanDataSource {
  fetchOne(query: IFindLoanQuery): Promise<ILoan | null>;
  create(record: ILoanCreationBody): Promise<ILoan>;
  updateOne(data: Partial<ILoan>, query: IFindLoanQuery): Promise<void>
  fetchAll(query: FindOptions<ILoan>): Promise<ILoan[]>
}



