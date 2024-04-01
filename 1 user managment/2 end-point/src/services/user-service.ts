import { IFindUserQuery, IUser, IUserCreationBody, IUserDataSource } from '../interfaces/user-interface';

class UserService {
  private userDataSource: IUserDataSource;

  constructor(_userDataSource: IUserDataSource) {
    this.userDataSource = _userDataSource;
  }

  async getUserByField(record: Partial<IUser>): Promise<IUser | null> {
    const query = { where: { ...record }, raw: true } as IFindUserQuery;
    return this.userDataSource.fetchOne(query);
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
