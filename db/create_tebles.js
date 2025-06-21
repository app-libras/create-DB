import openDB from './open_db.js'

const createTables = async () => {
    const db = await openDB()
    db.exec(`
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY CHECK (id = 1) NOT NULL UNIQUE DEFAULT 1,
            name TEXT,
            profile_pic TEXT
        );
    `)
   
        db.exec(`
        CREATE TABLE IF NOT EXISTS score (
            id INTEGER PRIMARY KEY CHECK (id = 1) NOT NULL UNIQUE DEFAULT 1,
            points INTEGER NOT NULL DEFAULT 0,
            level INTEGER NOT NULL DEFAULT 1,
            user_id INTEGER NOT NULL,
            FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `)
    
    
    db.exec(`
        CREATE TABLE IF NOT EXISTS aulas (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL UNIQUE,
            is_start INTEGER NOT NULL DEFAULT 0,
            is_finish INTEGER NOT NULL DEFAULT 0,
            step INTEGER NOT NULL
        );
    `)
    db.exec(`
        CREATE TABLE IF NOT EXISTS materials  (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            path TEXT NOT NULL UNIQUE,
            is_question INTEGER NOT NULL DEFAULT 0,
            is_answer INTEGER NOT NULL DEFAULT 0,            
            aula_id INTEGER NOT NULL,
            FOREIGN KEY(aula_id) REFERENCES aulas(id) ON DELETE CASCADE
        );
    `)
    db.close()
}

export default createTables