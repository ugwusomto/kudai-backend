import { where } from "sequelize";
import { IFindPayeeQuery, IPayee, IPayeeCreationBody, IPayeeDataSource } from "../interfaces/payee-interface";

class PayeeService {
  private payeeDataSource: IPayeeDataSource;

  constructor(_payeeDataSource: IPayeeDataSource) {
    this.payeeDataSource = _payeeDataSource;
  }

  async fetchPayeeByAccountNumberAndBank(accountNumber : string , bankCode:string):Promise<IPayee | null>{
    const query = {where:{accountNumber , bankCode} , raw:true} 
    return await this.payeeDataSource.fetchOne(query)
  }

  async savePayeeRecord (data:Partial<IPayee>) : Promise<IPayee> {
    const record = {
      ...data,
      detail:{
        ...data.detail
      }
    } as IPayeeCreationBody
    return  await this.payeeDataSource.create(record)
  }

}

export default PayeeService;
