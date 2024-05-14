import * as yup from 'yup';
import { AccountStatus } from '../interfaces/enum/user-enum';

const registerSchema = yup.object({
  firstname: yup.string().lowercase().trim().required(),
  lastname: yup.string().lowercase().trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
});

const loginSchema = yup.object({
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
});

const forgotPasswordSchema = yup.object({
  email: yup.string().email().lowercase().trim().required(),
});

const resetPasswordSchema = yup.object({
  code: yup.string().trim().required(),
  email: yup.string().email().lowercase().trim().required(),
  password: yup.string().min(6).trim().required(),
});

const setAccountStatusSchema = yup.object({
  userId: yup.string().trim().required(),
  status: yup.string().required().uppercase().oneOf(Object.values(AccountStatus)),
});


const ValidationSchema = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  setAccountStatusSchema
};

export default ValidationSchema;
