import * as yup from 'yup';

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

const ValidationSchema = {
  registerSchema,
  loginSchema,
  forgotPasswordSchema
};

export default ValidationSchema;
