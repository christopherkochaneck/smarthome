import { model, Schema } from 'mongoose';
export const User = model(
  'User',
  new Schema({
    username: { type: String, minlength: 5, maxlength: 128, required: true },
    password: { type: String, minlength: 5, maxlength: 128, required: true },
  })
);
