import express from 'express';
import { RGBW2 } from '../../models/rgbw2';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const rgbw2 = await RGBW2.find();
    res.status(200).send(rgbw2);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const rgbw2 = await RGBW2.findById(req.params.id);

    if (!rgbw2)
      return res.status(404).send('The RGBW2 with the given ID was not found.');

    res.send(rgbw2);
  } catch (error) {}
});

router.post('/', async (req, res) => {
  try {
    let rgbw2 = new RGBW2({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    rgbw2 = await rgbw2.save();
    res.status(200).send(rgbw2);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let rgbw2 = await RGBW2.findByIdAndUpdate(
      req.params.id,
      {
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!rgbw2)
      return res.status(404).send('The RGBW2 with the given ID was not found.');

    res.send(rgbw2);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const rgbw2 = await RGBW2.findByIdAndRemove(req.params.id);
    if (!rgbw2) {
      console.log('Not found');
      return res.status(404).send('The RGBW2 with the given ID was not found.');
    }

    res.send(rgbw2);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
