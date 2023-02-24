import express from 'express';
import { Group } from '../../models/group';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const groups = await Group.find();
    return res.status(200).send(groups);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);

    if (!group)
      return res.status(404).send('The Group with the given ID was not found.');

    return res.status(200).send(group);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', auth, async (req, res) => {
  try {
    let group = new Group({
      id: req.body.id,
      name: req.body.name,
      ids: req.body.ids,
    });
    group = await group.save();
    return res.status(200).send(group);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
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

    return res.status(200).send(group);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const group = await Group.findByIdAndRemove(req.params.id);

    if (!group)
      return res.status(404).send('The Group with the given ID was not found.');

    return res.status(200).send(group);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

export default router;
