import { Request, Response } from "express";
import Utility from "../utils/index.utils";
import { ResponseCode } from "../interfaces/enum/code-enum";
import AccountService from "../services/account-service";
import PaymentService from "../services/payment-service";
import TransactionService from "../services/transaction-service";
import { TransactionStatus } from "../interfaces/enum/transaction-enum";
import sequelize from "../database";

class TransactionController {
  private transactionService: TransactionService;
  private accountService: AccountService;


  constructor(_transactionService: TransactionService, _accountService: AccountService) {
    this.transactionService = _transactionService;
    this.accountService = _accountService;

  }

  private async deposit(accountId: string, transactionId: string, amount: number): Promise<boolean> {
    const tx = await sequelize.transaction();
    try {
      await this.accountService.topUpBalance(accountId, amount, { transaction: tx });
      await this.transactionService.setStatus(transactionId, TransactionStatus.COMPLETED, { transaction: tx });
      await tx.commit();
      return true;
    } catch (error) {
      await tx.rollback();
      return false
    }
  }

  async initiatePaystackDeposit(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      const depositInfo = await PaymentService.generatePaystackPaymentUrl(params.user.email, params.amount);
      if (!depositInfo) {
        return Utility.handleError(res, "Paystack payment not available , try again in few seconds", ResponseCode.NOT_FOUND);
      }
      const newTransaction = {
        userId: params.user.id,
        accountId: params.accountId,
        amount: params.amount,
        reference: depositInfo.reference,
        detail: {}
      }

      let deposit = await this.transactionService.depositByPaystack(newTransaction);
      return Utility.handleSuccess(res, "Transaction created successfully", { transaction: deposit, url: depositInfo.authorization_url }, ResponseCode.SUCCESS);
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }


  async verifyPaystackDeposit(req: Request, res: Response) {
    try {
      const params = { ...req.body };
      let transaction = await this.transactionService.fetchTransactionByReference(params.reference);
      if (!transaction) {
        return Utility.handleError(res, "Invalid transaction reference", ResponseCode.NOT_FOUND);
      }

      if (transaction.status != TransactionStatus.IN_PROGRESS) {
        return Utility.handleError(res, "Transaction status not supported", ResponseCode.NOT_FOUND);
      }

      const isValidPaymentTx = await PaymentService.verifyPaystackPayment(params.reference, transaction.amount);
      if (!isValidPaymentTx) {
        return Utility.handleError(res, "Invalid transaction reference", ResponseCode.NOT_FOUND);
      }

      const deposit = await this.deposit(transaction.accountId, transaction.id, transaction.amount);
      if (!deposit) {
        return Utility.handleError(res, "Deposit failed", ResponseCode.NOT_FOUND);

      }

      return Utility.handleSuccess(res, "Deposit was completed successfully", { transaction }, ResponseCode.SUCCESS);
    } catch (error) {
      return Utility.handleError(res, (error as TypeError).message, ResponseCode.SERVER_ERROR);
    }
  }

}

export default TransactionController;
