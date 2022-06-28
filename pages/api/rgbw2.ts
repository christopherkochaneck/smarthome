import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import * as path from 'path';

const dirName = path.join(process.cwd(), 'data');
const fileName = path.join(process.cwd(), 'data', 'rgbw2.json');

function createFileIfNotExists() {
	if (!fs.existsSync(dirName)) {
		try {
			fs.mkdirSync(dirName);
		} catch (err) {
			console.log(err);
		}
	}

	if (!fs.existsSync(fileName)) {
		try {
			fs.writeFileSync(fileName, '[]');
		} catch (err) {
			console.log(err);
		}
	}
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;
	createFileIfNotExists();

	switch (method) {
		case 'GET':
			try {
				const data = fs.readFileSync(fileName).toString();
				return res.status(200).send(JSON.parse(data));
			} catch (err) {
				console.log(err);
			}
			break;
		case 'POST':
			try {
				const data = fs.readFileSync(fileName).toString();
				const object = JSON.parse(data);
				object.push(req.body);
				const appendedJson = JSON.stringify(object);
				fs.writeFileSync(fileName, appendedJson);
				return res.status(200).send(appendedJson);
			} catch (err) {
				console.log(err);
			}

			break;
		case 'PATCH':
			try {
				const data = fs.readFileSync(fileName).toString();

				const object = JSON.parse(data);
				const updateIndex = object.findIndex((x: any) => (x.id = req.body.id));

				object[updateIndex].title = req.body.title;

				object[updateIndex].ipAdress = req.body.ipAdress;

				// object.push(req.body);
				// const appendedJson = JSON.stringify(object);
				// fs.writeFileSync(fileName, appendedJson);
				// return res.status(200).send(appendedJson);
				return res.status(200).send('hello');
			} catch (err) {
				console.log(err);
			}

			break;
		case 'DELETE':
			req.body.id;
			break;
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PATCH', 'DELETE']);
			return res.status(405).end(`Method ${method} Not Allowed`);
			break;
	}
}
