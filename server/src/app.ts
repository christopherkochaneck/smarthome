import express from 'express';
import cors from 'cors';

import group from './routes/group';
import plugS from './routes/plugS';
import rgbw2 from './routes/rgbw2';
import scene from './routes/scene';
import serverData from './routes/serverData';
import powerLog from './routes/powerLog';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/group', group);
app.use('/api/plugS', plugS);
app.use('/api/rgbw2', rgbw2);
app.use('/api/scene', scene);
app.use('/api/serverData', serverData);
app.use('/api/powerLog', powerLog);

app.listen(3001, () => {
  console.log('Running at port 3001');
});
