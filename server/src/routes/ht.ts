import express from 'express';
import { HT } from '../../models/ht';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const ht = await HT.find();
    res.status(200).send(ht);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const ht = await HT.findById(req.params.id);

    if (!ht)
      return res.status(404).send('The HT with the given ID was not found.');

    res.send(ht);
  } catch (error) {}
});

router.post('/', async (req, res) => {
  try {
    let ht = new HT({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    ht = await ht.save();
    res.status(200).send(ht);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
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

    res.send(ht);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const ht = await HT.findByIdAndRemove(req.params.id);
    if (!ht) {
      return res.status(404).send('The HT with the given ID was not found.');
    }

    res.send(ht);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
