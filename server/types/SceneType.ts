import color from '../interfaces/color';

export type Action = {
  id: string;
  type: 'rgbw2' | 'plugs';
  actions: {
    state?: boolean;
    color?: color;
  };
};

export type SceneType = {
  id: string;
  name: string;
  actions: Action[];
};
