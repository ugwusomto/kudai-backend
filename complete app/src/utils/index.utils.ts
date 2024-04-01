import { Response } from 'express';
import { createLogger , format , info, transport, transports } from 'winston';

const printRed = (text: string) => {
  console.log('\x1b[31m%s\x1b[0m', `${text} \n`);
};

const logger = createLogger({
  transports :[
    new transports.File({
      filename:'./logs/index.log',
      level:'error',
      format:format.combine(format.timestamp({format:'YYYY-MM-DD HH:mm:ss'}),format.printf((info)=>`${info.timestamp} ${info.level} : ${info.message} `))
    })
  ]
})

const handleError = (res: Response, message: string, statusCode: number = 400) => {
  logger.log({level : 'error' , message});
  return res.status(statusCode).json({ status: false, message });
};

const handleSuccess = (res: Response, message: string, data = {}, statusCode: number = 200) => {
  return res.status(statusCode).json({ status: true, message, data: { ...data } });
};

const generateCode = (num: number = 15) => {
  const dateString = Date.now().toString(36);
  const randomness = Math.random().toString(36).substr(2);
  let result = randomness + dateString;
  result = result.length > num ? result.substring(0, num) : result;
  return result.toUpperCase();
};



const Utility = {
  printRed,
  handleError,
  handleSuccess,
  generateCode
};

export default Utility;
