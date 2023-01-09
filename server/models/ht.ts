import { model, Schema } from 'mongoose';

export const HT = model(
  'HT',
  new Schema({
    title: { type: String },
    ipAdress: { type: String },
  })
);
