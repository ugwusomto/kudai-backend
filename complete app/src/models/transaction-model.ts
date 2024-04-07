import Db from "../database";
import { ITransactionModel } from "../interfaces/transaction-interface";
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Utility from "../utils/index.utils";

const TransactionModel = Db.define<ITransactionModel>(
  "TransactionModel",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(30, 2),
      defaultValue: 0.0,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "transactions",
    createdAt: "createdAt",
    updatedAt: "updatedAt",
    hooks: {
      beforeCreate: async (transaction, options) => {
        if (transaction.detail && typeof transaction.detail == "object") {
          transaction.detail = JSON.stringify(transaction.detail) as any;
        }
      },
      beforeUpdate: async (transaction, options) => {
        if (transaction.detail && typeof transaction.detail == "object") {
          transaction.detail = JSON.stringify(transaction.detail) as any;
        }
      },
      afterCreate: async (transaction: any, options) => {
        if (transaction && typeof transaction == "object") {
          transaction.detail = Utility.parseToObject(transaction.detail);
        }
      },
      afterFind: async (transaction: any, options) => {
        if (Array.isArray(transaction)) {
          transaction.forEach((tx, index) => {
            if (tx.detail && typeof tx.detail === "string") {
              tx.detail = Utility.parseToObject(tx.detail);
            }
          });
        } else {
          if (transaction && typeof transaction == "object") {
            transaction.detail = Utility.parseToObject(transaction.detail);
          }
        }

      },
    },
  }
);

export default TransactionModel;
