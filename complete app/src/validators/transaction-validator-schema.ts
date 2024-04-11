import * as yup from 'yup';


const initiatePaystackDeposit = yup.object({
  amount: yup.number().required(),
  accountId: yup.string().trim().required(),
});

const verifyPaystackDeposit = yup.object({
  reference: yup.string().trim().required(),
});

const ValidationSchema = {
  initiatePaystackDeposit,
  verifyPaystackDeposit
};

export default ValidationSchema;
