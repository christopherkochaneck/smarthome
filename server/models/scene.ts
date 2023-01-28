import { model, Schema } from 'mongoose';

export const Scene = model(
  'Scene',
  new Schema({
    name: { typ: String },
    actions: [
      {
        state: { type: Boolean },
        color: {
          red: { type: Number },
          green: { type: Number },
          blue: { type: Number },
        },
      },
    ],
  })
);
