import { Optional, Model } from 'sequelize';

export interface IToken {
  id: string;
  key: string;
  code: string;
  type: string;
  expires: Date;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IFindTokenQuery {
    where: {
      [key: string]: string;
    };
    raw?: boolean;
    returning: boolean;
  }
  

export interface ITokenCreationBody extends Optional<IToken, 'id' | 'createdAt' | 'updatedAt'> {}

export interface ITokenModel extends Model<IToken, ITokenCreationBody>, IToken {}

export interface ITokenDataSource {
  fetchOne(query: IFindTokenQuery): Promise<IToken | null>;
  create(record: ITokenCreationBody): Promise<IToken>;
  updateOne(data: Partial<IToken> , query: IFindTokenQuery) : Promise<void>
}



