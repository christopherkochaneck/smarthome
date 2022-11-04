import * as fs from 'fs';
import * as path from 'path';
import { GroupType } from '../../types/GroupType';
import express from 'express';
const router = express.Router();

const dirName = path.join(process.cwd(), 'data');
const fileName = path.join(process.cwd(), 'data', 'groups.json');

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

  if (!fs.existsSync(fileName)) {
    try {
      fs.writeFileSync(fileName, '[]');
    } catch (err) {
      console.log(err);
    }
  }
}

createFileIfNotExists();

router.get('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();
    return res.status(200).send(JSON.parse(data));
  } catch (err) {
    console.log(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();
    const object = JSON.parse(data);
    object.push(req.body);
    const appendedJson = JSON.stringify(object);
    fs.writeFileSync(fileName, appendedJson);
    return res.status(200).send(JSON.parse(appendedJson));
  } catch (err) {
    console.log(err);
  }
});

router.patch('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();

    const object = JSON.parse(data);
    const updateIndex = object.findIndex((x: any) => x.id == req.body.id);

    object[updateIndex] = req.body;

    const updatedJson = JSON.stringify(object);
    fs.writeFileSync(fileName, updatedJson);
    return res.status(200).send(updatedJson);
  } catch (err) {
    console.log(err);
  }
});

router.delete('/', async (req, res) => {
  try {
    const data = fs.readFileSync(fileName).toString();

    const groups: GroupType[] = JSON.parse(data);

    const filteredGroups = groups.filter((x) => x.id !== req.body.id);

    const updatedJson = JSON.stringify(filteredGroups);
    fs.writeFileSync(fileName, updatedJson);
    return res.status(200).send(updatedJson);
  } catch (err) {
    console.log(err);
  }
});

export default router;
