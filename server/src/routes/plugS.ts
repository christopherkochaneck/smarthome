import express from 'express';
import { Device } from '../../models/device';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const plugS = await Device.find();
    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const plugS = await Device.findById(req.params.id);

    if (!plugS)
      return res
        .status(404)
        .send('The Device with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let plugS = new Device({
      ipAdress: req.body.ipAdress,
      title: req.body.title,
      type: 'plugs',
    });
    plugS = await plugS.save();
    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    let plugS = await Device.findByIdAndUpdate(
      req.params.id,
      {
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!plugS)
      return res
        .status(404)
        .send('The Device with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const plugS = await Device.findByIdAndRemove(req.params.id);

    if (!plugS)
      return res
        .status(404)
        .send('The Device with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
