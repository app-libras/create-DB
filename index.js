import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import createTables from "./db/create_tebles.js";
import openDB from "./db/open_db.js";
import { insertAulas, insertMaterials, insertScore } from "./db/insert_in_db.js";

await createTables();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function  readJsonFile(file) {
    const dataPath = path.join(__dirname, file);
    const dataFiles = await readFile(dataPath, 'utf-8');
    const data = await JSON.parse(dataFiles);

    return data
    
}

async function writeToDB() {
    const db = await openDB();
    await insertScore();
    await insertAulas(db, await readJsonFile('./data/aulas.json'));
    await insertMaterials(db, await readJsonFile('./data/datilo.json'));
    await insertMaterials(db, await readJsonFile('./data/saudacao.json'));
    await insertMaterials(db, await readJsonFile('./data/frutas.json'));
    // await insertMaterials(db, await readJsonFile('./data/quest.json'));
    await insertMaterials(db, await readJsonFile('./data/nume.json'));
    db.close();
}


await writeToDB();



