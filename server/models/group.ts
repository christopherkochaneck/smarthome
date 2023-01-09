import { model, Schema } from 'mongoose';

export const Group = model(
  'Group',
  new Schema({
    name: { type: String },
    ids: { type: Array },
  })
);
