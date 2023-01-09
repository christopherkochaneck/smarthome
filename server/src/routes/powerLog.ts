import express from 'express';
import { PowerLog } from '../../models/powerLog';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const powerLog = await PowerLog.find();
    res.status(200).send(powerLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const powerLog = await PowerLog.findById(req.params.id);

    if (!powerLog)
      return res
        .status(404)
        .send('The PowerLog with the given ID was not found.');

    res.send(powerLog);
  } catch (error) {}
});

router.post('/', async (req, res) => {
  try {
    let powerLog = new PowerLog({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    powerLog = await powerLog.save();
    res.status(200).send(powerLog);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let powerLog = await PowerLog.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!powerLog)
      return res
        .status(404)
        .send('The PowerLog with the given ID was not found.');

    res.send(powerLog);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const powerLog = await PowerLog.findByIdAndRemove(req.params.id);

    if (!powerLog)
      return res
        .status(404)
        .send('The PowerLog with the given ID was not found.');

    res.send(powerLog);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
