import color from '../interfaces/color';

export type Action = {
	_id: string;
	type: 'rgbw2' | 'plugS';
	actions: {
		state?: boolean;
		color?: color;
	};
};

export type SceneType = {
	_id: string;
	name: string;
	actions: Action[];
};
