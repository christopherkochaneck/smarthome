import express from 'express';
import cors from 'cors';
import logger from 'tw-logger';

import group from './routes/group';
import rgbw2 from './routes/rgbw2';
import plugS from './routes/plugs';
import scene from './routes/scene';
import serverData from './routes/serverData';
import powerLog from './routes/powerLog';
import user from './routes/user';

import { establishConnection } from './startup/db';
import * as dotenv from 'dotenv';
import httpLogger from 'tw-express-http-logger';

dotenv.config();
const app = express();

app.use(express.json());
app.disable('x-powered-by');
app.use(cors());
app.use(httpLogger());

establishConnection();

app.use('/api/group', group);
app.use('/api/plugs', plugS);
app.use('/api/rgbw2', rgbw2);
app.use('/api/scene', scene);
app.use('/api/serverData', serverData);
app.use('/api/powerLog', powerLog);
app.use('/api/user', user);

let server;
if (process.env.NODE_ENV !== 'test') {
  app.listen(3001, () => {
    logger.info('Running at port 3001');
  });
} else {
  server = app.listen();
}

module.exports = server;
