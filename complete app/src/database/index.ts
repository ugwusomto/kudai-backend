import { Sequelize, Dialect } from 'sequelize';

const database = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const dialect = (process.env.DB_DIALECT as Dialect) ?? 'mysql';
const host = process.env.DB_HOST as string;
const port = parseInt(process.env.DB_PORT as string);

const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  port,
  logging: false,
});


export default sequelize;