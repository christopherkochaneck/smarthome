import color from '../interfaces/color';

export type Action = {
	id: string;
	type: 'rgbw2' | 'plugS';
	actions: {
		state: boolean | null;
		color: color | null;
	};
};

export type SceneType = {
	id: string;
	name: string;
	actions: Action[];
};
