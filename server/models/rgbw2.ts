import { model, Schema } from 'mongoose';

export const RGBW2 = model(
  'RGBW2',
  new Schema({
    title: { type: String },
    ipAdress: { type: String },
    type: { type: String },
  })
);
