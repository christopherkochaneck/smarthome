import { model, Schema } from 'mongoose';

export const Scene = model(
  'Scene',
  new Schema({
    id: { type: String, required: true },
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
