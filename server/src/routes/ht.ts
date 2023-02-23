import express from 'express';
import { HT } from '../../models/ht';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const ht = await HT.find();
    return res.status(200).send(ht);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const ht = await HT.findById(req.params.id);

    if (!ht)
      return res.status(404).send('The HT with the given ID was not found.');

    return res.status(200).send(ht);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let ht = new HT({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    ht = await ht.save();
    return res.status(200).send(ht);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    let ht = await HT.findByIdAndUpdate(
      req.params.id,
      {
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!ht)
      return res.status(404).send('The HT with the given ID was not found.');

    return res.status(200).send(ht);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const ht = await HT.findByIdAndRemove(req.params.id);
    if (!ht) {
      return res.status(404).send('The HT with the given ID was not found.');
    }

    return res.status(200).send(ht);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
