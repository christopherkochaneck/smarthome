import { model, Schema } from 'mongoose';

export const Group = model(
  'Group',
  new Schema({
    id: { type: String, required: true },
    name: { type: String },
    ids: { type: Array },
  })
);
