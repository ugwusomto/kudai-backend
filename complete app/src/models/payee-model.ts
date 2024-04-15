import Db from '../database';
import { IPayeeModel } from '../interfaces/payee-interface';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import Utility from '../utils/index.utils';



const PayeeModel = Db.define<IPayeeModel>(
  'PayeeModel',
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
    accountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    accountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bankCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    detail: {
      type: DataTypes.JSON,
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
    tableName: 'payees',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    hooks: {
      beforeCreate: async (payee, options) => {
        if (payee.detail && typeof payee.detail == "object") {
          payee.detail = JSON.stringify(payee.detail) as any;
        }
      },
      beforeUpdate: async (payee, options) => {
        if (payee.detail && typeof payee.detail == "object") {
          payee.detail = JSON.stringify(payee.detail) as any;
        }
      },
      afterCreate: async (payee: any, options) => {
        if (payee && typeof payee == "object") {
          payee.detail = Utility.parseToObject(payee.detail);
        }
      },
      afterFind: async (payee: any, options) => {
        if (Array.isArray(payee)) {
          payee.forEach((tx, index) => {
            if (tx.detail && typeof tx.detail === "string") {
              tx.detail = Utility.parseToObject(tx.detail);
              tx.bankName = Utility.getBankName(tx.bankCode);
            }
          });
        } else {
          if (payee && typeof payee == "object") {
            payee.detail = Utility.parseToObject(payee.detail);
            payee.bankName = Utility.getBankName(payee.bankCode);

          }
        }

      },
    },
  }
);


export default PayeeModel;