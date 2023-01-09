import { connect, set } from 'mongoose';

export const establishConnection = async () => {
  try {
    set('strictQuery', false);
    console.log('Trying to connect to MongoDB Instance...');
    await connect('mongodb://localhost:27017/?retryWrites=true&w=majority', {
      user: 'root',
      pass: 'root',
    });
    console.log('Connected to MongoDB Instance');
  } catch (error) {
    console.error(error);
  }
};

export default establishConnection;
