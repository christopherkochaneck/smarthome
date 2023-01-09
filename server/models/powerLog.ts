import { model, Schema } from 'mongoose';

export const PowerLog = model(
  'PowerLog',
  new Schema({
    date: { type: Date },
    power: { type: Number },
  })
);
