import express, { Request, Response } from 'express';
import { Auth, validator } from '../middlewares/index.middleware';
import ValidationSchema from '../validators/transaction-validator-schema';
import TransactionController from '../controllers/transaction-controller';

import { container } from 'tsyringe';


const router = express.Router();

const transactionController = container.resolve(TransactionController)

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


  router.post("/make-withdrawal-by-paystack", validator(ValidationSchema.makeWithdrawalByPaystack), Auth(), (req: Request, res: Response) => {
    return transactionController.withdrawByPaystack(req, res);
  });

  router.get("/list", Auth(), (req: Request, res: Response) => {
    return transactionController.getAllUserTransactions(req, res);
  });

  router.get("/:id", Auth(), (req: Request, res: Response) => {
    return transactionController.getUserTransaction(req, res);
  });

  return router;
};

export default createTransactionRoute();
