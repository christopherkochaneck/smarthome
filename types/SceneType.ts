import { PlugSType } from './PlugSType';
import { RGBW2Type } from './RGBW2Type';

export interface Property {
	color?: string;
	state?: string;
}

export interface Action {
	id: string;
	type: RGBW2Type | PlugSType;
	properties: Property[];
}

export type SceneType = {
	id: string;
	name: string;
	actions: Action[];
};
