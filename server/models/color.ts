import { model, Schema } from 'mongoose';

export const Color = model(
  'Color',
  new Schema({
    red: { type: Number },
    green: { type: Number },
    blue: { type: Number },
  })
);

export default Color;
