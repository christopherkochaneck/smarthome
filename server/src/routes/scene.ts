import express from 'express';
import { Scene } from '../../models/scene';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const scene = await Scene.find();
    return res.status(200).send(scene);
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    return res.status(200).send(scene);
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let scene = new Scene({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      name: req.body.name,
    });

    scene = await scene.save();

    return res.status(200).send(scene);
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    let scene = await Scene.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        ipAdress: req.body.ipAdress,
        name: req.body.name,
      },
      { new: true }
    );

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    return res.status(200).send(scene);
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const scene = await Scene.findByIdAndRemove(req.params.id);

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    return res.status(200).send(scene);
  } catch (error) {
    return res.status(500).send('Internal server error.');
  }
});

export default router;
