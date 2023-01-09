import express from 'express';
const router = express.Router();
import os from 'os';

router.get('/', async (req, res) => {
  return res.status(200).send({
    freeMemory: os.freemem(),
    totalMemory: os.totalmem(),
    architecture: os.arch(),
    hostName: os.hostname(),
    platform: os.platform,
    upTime: os.uptime(),
  });
});

export default router;
