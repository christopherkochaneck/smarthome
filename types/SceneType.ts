import color from '../interfaces/color';
import { PlugSType } from './PlugSType';
import { RGBW2Type } from './RGBW2Type';

export type Action = { id: string; state?: boolean; type: RGBW2Type | PlugSType; color?: color };

export type SceneType = {
	id: string;
	name: string;
	actions: Action[];
};
