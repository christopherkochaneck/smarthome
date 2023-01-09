import express from 'express';
import { Group } from '../../models/group';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).send(groups);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group)
      return res.status(404).send('The Group with the given ID was not found.');

    res.send(group);
  } catch (error) {}
});

router.post('/', async (req, res) => {
  try {
    let group = new Group({
      id: req.body.id,
      name: req.body.name,
      ids: req.body.ids,
    });
    group = await group.save();
    res.status(200).send(group);
  } catch (error) {
    console.error(error);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    let group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        name: req.body.name,
        ids: req.body.ids,
      },
      { new: true }
    );

    if (!group)
      return res.status(404).send('The Group with the given ID was not found.');

    res.send(group);
  } catch (error) {
    console.error(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const group = await Group.findByIdAndRemove(req.params.id);

    if (!group)
      return res.status(404).send('The Group with the given ID was not found.');

    res.send(group);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
