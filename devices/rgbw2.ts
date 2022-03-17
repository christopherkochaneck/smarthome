import axios from 'axios';

export const getStatus = async (ipAddress: string) => {
	return await axios.get(`http://${ipAddress}/status`, {
		headers: {
			// Authorization: `Basic ${btoa(unescape(encodeURIComponent(`admin:admin`)))}`,
			Authorization: `Basic YWRtaW46YWRtaW4=`,
		},
	});
	// return await fetch(`http://${ipAddress}/status`, { method: 'GET', mode: 'no-cors' })
	// 	.then((json) => console.log(json))
	// 	.catch((e) => console.log(e.message));
};

export const toggleDevice = async (ipAddress: string, mode: boolean) => {
	if (mode) {
		return await fetch(`http://${ipAddress}/color/0?turn=on`, {
			method: 'GET',
			mode: 'no-cors',
		}).catch((e) => console.log(e.message));
	}
	return await fetch(`http://${ipAddress}/color/0?turn=off`, {
		method: 'GET',
		mode: 'no-cors',
	}).catch((e) => console.log(e.message));
};
