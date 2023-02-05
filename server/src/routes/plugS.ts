import express from 'express';
import { PlugS } from '../../models/plugS';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const plugS = await PlugS.find();
    res.status(200).send(plugS);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const plugS = await PlugS.findById(req.params.id);

    if (!plugS)
      return res.status(404).send('The PlugS with the given ID was not found.');

    res.send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server error');
  }
});

router.post('/', async (req, res) => {
  try {
    let plugS = new PlugS({
      ipAdress: req.body.ipAdress,
      title: req.body.title,
      type: 'plugs',
    });
    plugS = await plugS.save();
    res.status(200).send(plugS);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
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

    res.send(plugS);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const plugS = await PlugS.findByIdAndRemove(req.params.id);

    if (!plugS)
      return res.status(404).send('The PlugS with the given ID was not found.');

    res.send(plugS);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
