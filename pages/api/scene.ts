import * as fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { SceneType } from '../../types/SceneType';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	const { method } = req;

	const dirName = path.join(process.cwd(), 'data');
	const fileName = path.join(process.cwd(), 'data', 'scenes.json');

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

	switch (method) {
		case 'GET':
			createFileIfNotExists();
			try {
				const data = fs.readFileSync('data/scenes.json').toString();
				return res.status(200).send(JSON.parse(data));
			} catch (err) {
				console.log(err);
			}
			break;
		case 'POST':
			try {
				const data = fs.readFileSync('data/scenes.json').toString();
				const object = JSON.parse(data);
				object.push(req.body);
				const appendedJson = JSON.stringify(object);
				fs.writeFileSync('data/scenes.json', appendedJson);
				return res.status(200).send(appendedJson);
			} catch (err) {
				console.log(err);
			}

			break;
		case 'PATCH':
			try {
				const data = fs.readFileSync(fileName).toString();

				const object = JSON.parse(data);
				const updateIndex = object.findIndex((x: any) => x.id == req.body.id);

				object[updateIndex].title = req.body.title;

				object[updateIndex].ipAdress = req.body.ipAdress;

				const updatedJson = JSON.stringify(object);
				fs.writeFileSync(fileName, updatedJson);
				return res.status(200).send(updatedJson);
			} catch (err) {
				console.log(err);
			}

			break;
		case 'DELETE':
			try {
				const data = fs.readFileSync(fileName).toString();

				const scenes: SceneType[] = JSON.parse(data);

				const filteredScenes = scenes.filter((x) => x.id !== req.body.id);

				console.log('filteredScenes', filteredScenes);

				const updatedJson = JSON.stringify(filteredScenes);
				fs.writeFileSync(fileName, updatedJson);
				return res.status(200).send(updatedJson);
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
