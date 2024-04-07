import * as yup from 'yup';
import { AccountType } from '../interfaces/enum/account-enum';

const createAccountSchema = yup.object({
  type: yup.string().trim().required().oneOf(Object.values(AccountType)),
  
});

const ValidationSchema = {
  createAccountSchema
};

export default ValidationSchema;
