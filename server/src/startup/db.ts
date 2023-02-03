import logger from 'tw-logger';
import { connect, set } from 'mongoose';

export const establishConnection = async () => {
  try {
    set('strictQuery', false);
    logger.info('Running at port 3001');
    await connect(`${process.env.DB_CONNECTION_STRING}`, {
      user: `${process.env.DB_USER}`,
      pass: `${process.env.DB_PASS}`,
    });
    logger.info('Connected to MongoDB Instance');
  } catch (error: any) {
    logger.error(error);
  }
};

export default establishConnection;
