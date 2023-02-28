import { model, Schema } from 'mongoose';

export const Device = model(
  'Device',
  new Schema({
    title: { type: String },
    ipAdress: { type: String },
    type: { type: String },
  })
);
