import color from '../interfaces/color';

export type Action = {
	_id: string;
	type: 'rgbw2' | 'plugS';
	actions: {
		state: boolean | null;
		color: color | null;
	};
};

export type SceneType = {
	_id: string;
	name: string;
	actions: Action[];
};
