import { model, Schema } from 'mongoose';

export const PlugS = model(
  'PlugS',
  new Schema({
    title: { type: String },
    ipAdress: { type: String },
  })
);
