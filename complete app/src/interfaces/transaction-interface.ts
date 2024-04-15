import { Optional, Model, Transaction } from "sequelize";

export interface IPaystackPaymentObject {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface IPaystackInitTransferObject {
  transferCode:string;
  reference: string;
}

export interface ITransactionDetail {
  gateway?: string;
  recieverAccountNumber?:string
}

export interface ITransaction {
  id: string;
  userId: string;
  reference:string;
  accountId: string;
  amount: number;
  detail: ITransactionDetail;
  type: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindTransactionQuery {
  where: {
    [key: string]: string;
  };
  transaction?:Transaction;
  raw?: boolean;
  returning?: boolean;
}

export interface ITransactionCreationBody extends Optional<ITransaction, "id" | "createdAt" | "updatedAt"> {}

export interface ITransactionModel extends Model<ITransaction, ITransactionCreationBody>, ITransaction {}

export interface ITransactionDataSource {
  fetchOne(query: IFindTransactionQuery): Promise<ITransaction | null>;
  create(record: ITransactionCreationBody , options?: Partial<IFindTransactionQuery>): Promise<ITransaction>;
  updateOne(data: Partial<ITransaction>, query: IFindTransactionQuery): Promise<void>;
}
