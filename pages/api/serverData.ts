import { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			try {
				const jsonObject = `{"freeMemory": "${os.freemem()}", "totalMemory": "${os.totalmem()}", "architecture": "${os.arch()}", "hostName": "${os.hostname()}", "platform": "${
					os.platform
				}", "upTime": "${os.uptime()}"}`;
				os.cpus;
				return res.status(200).send(JSON.parse(jsonObject));
			} catch (err) {
				console.log(err);
			}
			break;
		default:
			try {
				res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
				return res.status(405).end(`Method ${method} Not Allowed`);
			} catch (err) {
				console.log(err);
			}
			break;
	}
}
