import * as yup from 'yup';


const initiatePaystackDeposit = yup.object({
  amount: yup.number().required(),
  accountId: yup.string().trim().required(),
});

const verifyPaystackDeposit = yup.object({
  reference: yup.string().trim().required(),
});

const makeInternalTransferSchema = yup.object({
  senderAccountId: yup.string().trim().required(),
  recieverAccountNumber: yup.string().trim().required(),
  amount: yup.number().required(),
});

const ValidationSchema = {
  initiatePaystackDeposit,
  verifyPaystackDeposit,
  makeInternalTransferSchema
};

export default ValidationSchema;
