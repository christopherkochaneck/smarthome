import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

function checkIfFileExists() {
	if (!fs.existsSync('data/plugS.json')) {
		fs.writeFile('data/plugS.json', '[]', (err) => console.error(err));
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			checkIfFileExists();
			fs.readFile('data/rgbw2.json', 'utf8', (err, data) => {
				if (err) {
					console.error(err);
				} else {
					return res.status(200).send(JSON.parse(data));
				}
			});
			break;
		case 'POST':
			checkIfFileExists();
			let jsonObject = { id: req.body.id, title: req.body.title, ipAdress: req.body.ipAdress };
			fs.readFile('data/rgbw2.json', 'utf-8', (err, data) => {
				if (err) {
					console.log(err);
				} else {
					const object = JSON.parse(data);
					object.push(jsonObject);
					const appendedJson = JSON.stringify(object);
					fs.writeFile('data/rgbw2.json', appendedJson, 'utf8', (err) => {
						if (err) {
							console.log(err);
						}
					});
					return res.status(200).send(jsonObject);
				}
			});
			break;
		case 'PATCH':
			checkIfFileExists();
			req.body.id;
			break;
		case 'DELETE':
			checkIfFileExists();
			req.body.id;
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
			res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
