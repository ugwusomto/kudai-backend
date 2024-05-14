import Db from '../database';
import { ILoanModel } from '../interfaces/loan-interface';
import { DataTypes } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';


const LoanModel = Db.define<ILoanModel>(
  'LoanModel',
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
    amount: {
      type: DataTypes.DECIMAL(30,2),
      defaultValue:0.00,
      allowNull: false,
    },
    interest: {
      type: DataTypes.FLOAT,
      defaultValue:0,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue:'PENDING',
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
    tableName: 'loans',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
);


export default LoanModel;