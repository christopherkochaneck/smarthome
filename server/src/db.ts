import { connect } from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';

export const establishConnection = () => {
  const dotenvPath = path.join(
    process.cwd(),
    `../config/${process.env.NODE_ENV}.env`
  );
  console.log(dotenvPath);
  // const conString = dotenv.config({ path: __dirname + '/.env' }).parsed
  //   .DB_CONN_STRING;
  // if (conString !== undefined)
  //   connect(conString).then(() => console.log(`Connected to ${conString}`));
};
