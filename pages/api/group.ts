import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

function checkIfFileExists() {
	if (!fs.existsSync('data/groups.json')) {
		fs.writeFile('data/groups.json', '[]', (err) => console.error(err));
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	switch (method) {
		case 'GET':
			checkIfFileExists();
			console.log(req.body);

			fs.readFile('data/groups.json', 'utf8', (err, data) => {
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
			fs.readFile('data/groups.json', 'utf-8', (err, data) => {
				if (err) {
					console.log(err);
				} else {
					const object = JSON.parse(data);
					object.push(jsonObject);
					const appendedJson = JSON.stringify(object);
					fs.writeFile('data/groups.json', appendedJson, 'utf8', (err) => {
						if (err) {
							console.log(err);
						}
					});
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
