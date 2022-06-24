import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

function checkIfFileNotExists() {
	if (!fs.existsSync('data/plugS.json')) {
		try {
			fs.writeFileSync('data/plugS.json', '[]');
		} catch (err) {
			console.log(err);
		}
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	checkIfFileNotExists();

	switch (method) {
		case 'GET':
			try {
				const data = fs.readFileSync('data/plugS.json').toString();
				return res.status(200).send(JSON.parse(data));
			} catch (err) {
				console.log(err);
			}
			break;
		case 'POST':
			try {
				const data = fs.readFileSync('data/plugS.json').toString();
				const object = JSON.parse(data);
				object.push(req.body);
				const appendedJson = JSON.stringify(object);

				fs.writeFileSync('data/plugS.json', appendedJson);
				return res.status(200).send(appendedJson);
			} catch (err) {
				console.log(err);
			}
			break;
		case 'PATCH':
			req.body.id;
			break;
		case 'DELETE':
			req.body.id;
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
