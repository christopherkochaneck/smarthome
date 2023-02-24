import express from 'express';
import { PlugS } from '../../models/plugS';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const plugS = await PlugS.find();
    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const plugS = await PlugS.findById(req.params.id);

    if (!plugS)
      return res.status(404).send('The PlugS with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let plugS = new PlugS({
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
    let plugS = await PlugS.findByIdAndUpdate(
      req.params.id,
      {
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!plugS)
      return res.status(404).send('The PlugS with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const plugS = await PlugS.findByIdAndRemove(req.params.id);

    if (!plugS)
      return res.status(404).send('The PlugS with the given ID was not found.');

    return res.status(200).send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
