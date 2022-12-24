import color from '../interfaces/color';
import { PlugSType } from './PlugSType';
import { RGBW2Type } from './RGBW2Type';

import { model, Schema } from 'mongoose';

export const Color = model("Color", {
  new Schema({
    red: { type: Number },
    green:  {type: Number },
    blue:  {type: Number },
  })
})

export const Actions = model("Actions", ({

  state: {type: Boolean},
  color: { type: Color },

})

export const Action = model("Action", {
  type: { type: String },
  actions: {
  })
);

export const Scene = model(
  'Scene',
  new Schema({
    id: { type: String, required: true },
    name: { typ: String },
    actions: { type: Action },
  })
);
