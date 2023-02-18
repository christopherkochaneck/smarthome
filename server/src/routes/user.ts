import express from 'express';
import { User } from '../../models/user';
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {}
});

export default router;
