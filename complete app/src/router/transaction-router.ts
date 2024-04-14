import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/transaction-validator-schema';
import TransactionController from '../controllers/transaction-controller';
import TransactionService from '../services/transaction-service';
import TransactionDataSource from '../datasources/transaction-datasource';
import AccountDataSource from '../datasources/account-datasource';
import AccountService from '../services/account-service';


const router = express.Router();
const accountService = new AccountService(new AccountDataSource());
const transactionService = new TransactionService(new TransactionDataSource());
const transactionController = new TransactionController(transactionService , accountService);

const createTransactionRoute = () => {


  router.post('/initiate-paystack-deposit', validator(ValidationSchema.initiatePaystackDeposit), Auth(), (req: Request, res: Response) => {
    return transactionController.initiatePaystackDeposit(req, res);
  });

  router.post("/verify-paystack-deposit", validator(ValidationSchema.verifyPaystackDeposit),Auth() , (req: Request, res: Response) => {
    return transactionController.verifyPaystackDeposit(req, res);
  });

  router.post("/make-transfer", validator(ValidationSchema.makeInternalTransferSchema), Auth(), (req: Request, res: Response) => {
    return transactionController.internalTransfer(req, res);
  });




  return router;
};

export default createTransactionRoute();
