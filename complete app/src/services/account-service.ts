import { where } from "sequelize";
import { IFindAccountQuery, IAccount, IAccountCreationBody, IAccountDataSource } from "../interfaces/account-interface";
import { AccountStatus } from "../interfaces/enum/account-enum";
import sequelize from "../database";
import { autoInjectable } from "tsyringe";
import AccountDataSource from "../datasources/account-datasource";

@autoInjectable()
class AccountService {
  private accountDataSource: AccountDataSource;

  constructor(_accountDataSource: AccountDataSource) {
    this.accountDataSource = _accountDataSource;
  }

  private generateAccountNumber(): string {
    let accountNumber = "";
    for (let i = 0; i < 10; i++) {
      accountNumber += Math.floor(Math.random() * 10);
    }
    return accountNumber;
  }

  private async createAccountNumber() {
    let accountNo = "";
    while (accountNo == "") {
      const result = this.generateAccountNumber();
      const exist = await this.accountDataSource.fetchOne({ where: { accountNumber: result }, raw: true });
      if (!exist) {
        accountNo = result;
        break;
      }
    }
    return accountNo;
  }

  async getAccounts(): Promise<IAccount[]> {
    const query = { where: {}, raw: true };
    return this.accountDataSource.fetchAll(query);
  }

  async createAccount(data: Partial<IAccountCreationBody>) {
    const record = {
      ...data,
      accountNumber: await this.createAccountNumber(),
      balance: 0.0,
      status: AccountStatus.ACTIVE,
    } as IAccountCreationBody;
    return this.accountDataSource.create(record);
  }

  async getAccountsByUserId(userId: string) {
    const query = {
      where: { userId },
      raw: true,
    };
    return this.accountDataSource.fetchAll(query);
  }

  async getAccountByField(record: Partial<IAccount>) {
    const query = {
      where: { ...record },
      raw: true,
    } as IFindAccountQuery;
    return this.accountDataSource.fetchOne(query);
  }


  async topUpBalance(accountId:string , amount : number , options : Partial<IFindAccountQuery> = {}) {
    const filter = {where : {id:accountId },...options};
    const update = {
      balance : sequelize.literal(`balance+${amount}`)
    }
    return await this.accountDataSource.updateOne(filter , update as any );
  }

}

export default AccountService;
