import express from 'express';
import { PowerLog } from '../../models/powerLog';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const powerLog = await PowerLog.find();
    return res.status(200).send(powerLog);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const powerLog = await PowerLog.findById(req.params.id);

    if (!powerLog)
      return res
        .status(404)
        .send('The PowerLog with the given ID was not found.');

    return res.status(200).send(powerLog);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let powerLog = new PowerLog({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    powerLog = await powerLog.save();
    return res.status(200).send(powerLog);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
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

    return res.status(200).send(powerLog);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const powerLog = await PowerLog.findByIdAndRemove(req.params.id);

    if (!powerLog)
      return res
        .status(404)
        .send('The PowerLog with the given ID was not found.');

    return res.status(200).send(powerLog);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
