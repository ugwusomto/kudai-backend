import { autoInjectable } from 'tsyringe';
import { IFindUserQuery, IUser, IUserCreationBody, IUserDataSource } from '../interfaces/user-interface';
import UserDataSource from '../datasources/user-datasource';

@autoInjectable()
class UserService {
  private userDataSource: UserDataSource;

  constructor(_userDataSource: UserDataSource) {
    this.userDataSource = _userDataSource;
  }

  async getUserByField(record: Partial<IUser>): Promise<IUser | null> {
    const query = { where: { ...record }, raw: true } as IFindUserQuery;
    return this.userDataSource.fetchOne(query);
  }

  async getAllUsers(): Promise<IUser[] | null> {
    const query = { where: {}, order: [['createdAt', 'DESC']], raw: true,  } as IFindUserQuery;
    return this.userDataSource.fetchAll(query);
  }

  async createUser(record: IUserCreationBody) {
    return this.userDataSource.create(record);
  }

  async updateRecord(searchBy : Partial<IUser> , record : Partial<IUser>):Promise<void>{
    const query = { where : {...searchBy} } as IFindUserQuery;
    await this.userDataSource.updateOne(query , record);
  }
}

export default UserService;
