import axios from 'axios';
import color from '../interfaces/color';

export const changeColor = async (ipAdress: string, color: color | undefined) => {
	try {
		if (color === undefined) {
			return;
		}
		await axios.get(
			`http://${ipAdress}/color/0?red=${color.red}&green=${color.green}&blue=${color.blue}`
		);
	} catch (error) {}
};
