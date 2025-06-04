import openDB from './open_db.js'

const createTables = async () => {
    const db = await openDB()
    db.exec(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            profile_pic TEXT
        );
    `)

    db.exec(`
        CREATE TABLE IF NOT EXISTS score (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            points INTEGER NOT NULL,
            level INTEGER NOT NULL,
            user_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `)
    db.exec(`
        CREATE TABLE IF NOT EXISTS aulas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            is_start INTEGER NOT NULL,
            is_finish INTEGER NOT NULL,
            step INTEGER NOT NULL
        );
    `)
    db.exec(`
        CREATE TABLE IF NOT EXISTS materials  (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            link TEXT NOT NULL UNIQUE,
            material INTEGER NOT NULL,
            aula_id INTEGER NOT NULL,
            FOREIGN KEY(aula_id) REFERENCES aulas(id) ON DELETE CASCADE
        );
    `)
    db.close()
}

export default createTables