import { model, Schema } from 'mongoose';

export const PlugS = model(
  'PlugS',
  new Schema({
    id: { type: String, required: true },
    title: { type: String },
    ipAdress: { type: String },
  })
);
