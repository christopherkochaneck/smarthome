import { connect, set } from 'mongoose';

export const establishConnection = async () => {
  try {
    set('strictQuery', false);
    console.log('Trying to connect to MongoDB Instance...');
    await connect(`${process.env.DB_CONNECTION_STRING}`, {
      user: `${process.env.DB_USER}`,
      pass: `${process.env.DB_PASS}`,
    });
    console.log('Connected to MongoDB Instance');
  } catch (error) {
    console.error(error);
  }
};

export default establishConnection;
