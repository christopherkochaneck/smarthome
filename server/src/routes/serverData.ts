import express from 'express';
const router = express.Router();
import os from 'os';

router.get('/', async (req, res) => {
  try {
    const jsonObject = `{"freeMemory": "${os.freemem()}", "totalMemory": "${os.totalmem()}", "architecture": "${os.arch()}", "hostName": "${os.hostname()}", "platform": "${
      os.platform
    }", "upTime": "${os.uptime()}"}`;
    return res.status(200).send(JSON.parse(jsonObject));
  } catch (err) {
    console.log(err);
  }
});

export default router;
