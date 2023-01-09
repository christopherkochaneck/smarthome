import express from 'express';
import { Scene } from '../../models/scene';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const scene = await Scene.find();
    res.status(200).send(scene);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const scene = await Scene.findById(req.params.id);

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    res.send(scene);
  } catch (error) {}
});

router.post('/', async (req, res) => {
  try {
    let scene = new Scene({
      id: req.body.id,
      ipAdress: req.body.ipAdress,
      title: req.body.title,
    });
    scene = await scene.save();
    res.status(200).send(scene);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let scene = await Scene.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        ipAdress: req.body.ipAdress,
        title: req.body.title,
      },
      { new: true }
    );

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    res.send(scene);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const scene = await Scene.findByIdAndRemove(req.params.id);

    if (!scene)
      return res.status(404).send('The Scene with the given ID was not found.');

    res.send(scene);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
