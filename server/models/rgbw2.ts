import { model, Schema } from 'mongoose';

export const RGBW2 = model(
  'RGBW2',
  new Schema({
    id: { type: String, required: true },
    title: { type: String },
    ipAdress: { type: String },
  })
);
