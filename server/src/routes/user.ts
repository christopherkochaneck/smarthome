import { authUser } from './../../../client/interfaces/authUser';
import express from 'express';
import { User } from '../../models/user';
import bcrypt from 'bcrypt';
import { auth } from '../middleware/auth';
import moment from 'moment';
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById<any>(req.params.id);

    const { username: name, permission, dayOfCreation } = user;
    return res.status(200).send({ name, permission, dayOfCreation });
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const dbUser = await User.findOne({ username: req.body.username });
    if (dbUser) return res.status(409).send('Username already exists');

    let user = new User({
      username: req.body.username,
      password: req.body.password,
      dayOfCreation: moment().toISOString(),
      permission: 'unauthorized',
    });

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    user = await user.save();

    return res.status(200).send(user);
  } catch (error) {
    return res.status(409).send('Internal server Error');
  }
});

router.patch('/:id', auth, async (req, res) => {
  try {
    let user = await User.findByIdAndUpdate(
      req.params.id,
      {
        id: req.body.id,
        username: req.body.username,
        password: req.body.password,
        permission: req.body.permission,
      },
      { new: true }
    );

    if (!user) return res.status(404).send('User not found');

    const salt = await bcrypt.genSalt(12);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findByIdAndRemove(id);
    return res.status(200).send(user);
  } catch (error) {
    return res.status(500).send('Internal server Error');
  }
});
export default router;
