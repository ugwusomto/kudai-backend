import * as yup from 'yup';


const initiatePaystackDeposit = yup.object({
  amount: yup.number().required(),
  accountId: yup.string().trim().required(),
});

const ValidationSchema = {
  initiatePaystackDeposit
};

export default ValidationSchema;
