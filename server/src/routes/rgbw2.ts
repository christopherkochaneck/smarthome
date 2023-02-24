import express from 'express';
import { RGBW2 } from '../../models/rgbw2';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const rgbw2 = await RGBW2.find();
    return res.status(200).send(rgbw2);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const rgbw2 = await RGBW2.findById(req.params.id);

    if (!rgbw2)
      return res.status(404).send('The RGBW2 with the given ID was not found.');

    return res.status(200).send(rgbw2);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let rgbw2 = new RGBW2({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
      type: req.body.type,
    });
    rgbw2 = await rgbw2.save();
    return res.status(200).send(rgbw2);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
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

    return res.status(200).send(rgbw2);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const rgbw2 = await RGBW2.findByIdAndRemove(req.params.id);
    if (!rgbw2) {
      return res.status(404).send('The RGBW2 with the given ID was not found.');
    }

    return res.status(200).send(rgbw2);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
