import openDB from "./open_db.js";
/**
 * Inserts the given aulas into the database.
 * @param {sqlite3.Database} db - The database to insert into.
 * @param {Array<Object>} aulas - The aulas to insert. Each aula should have the following properties:
 *   - {string} name - The name of the aula.
 *   - {number} is_start - Whether the aula is a start aula (1) or not (0).
 *   - {number} is_finish - Whether the aula is a finish aula (1) or not (0).
 *   - {number} step - The step of the aula.
 */
async function insertAulas(db, aulas) {
    let stmt;
    // Start a transaction.
    await db.run('BEGIN TRANSACTION');

    try {
        // Prepare the statement.
        stmt = await db.prepare(`
            INSERT INTO aulas (id, name, is_start, is_finish, step)
            VALUES (?, ?, ?, ?, ?)
        `);

        // Loop through each aula and insert it into the database.
        for (const aula of aulas) {
            await stmt.run( aula._id, aula.name, aula.is_start, aula.is_finish, aula.step);
        }

        // Commit the transaction.
        await db.run('COMMIT');
    } catch (err) {
        // If an error occurs, rollback the transaction.
        await db.run('ROLLBACK');
        console.log(err);
        // throw err;
    } finally {
        // Close the prepared statement.
        await stmt.finalize();
    }
}

/**
 * Inserts the given materials into the database.
 * @param {sqlite3.Database} db - The database to insert into.
 * @param {Array<Object>} materials - The materials to insert. Each material should have the following properties:
 *   - {string} name - The name of the material.
 *   - {string} path - The path of the material.
 *   - {number} aula_id - The ID of the associated aula.
 */
async function insertMaterials(db, materials) {
    let stmt;
    // Start a transaction.
    await db.run('BEGIN TRANSACTION');

    try {
        // Prepare the statement.
        stmt = await db.prepare(`
            INSERT INTO materials (name, path, aula_id, has_two_path, is_question, is_answer, is_material)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            `);
            
        // Loop through each material and insert it into the database.
        for (const material of materials) {
            await stmt.run(material.name, material.path, material.aula_id, material.has_two_path, material.is_question, material.is_answer, material.is_material);
        }

        // Commit the transaction.
        await db.run('COMMIT');
    } catch (err) {
        console.log(err);
        // If an error occurs, rollback the transaction.
        await db.run('ROLLBACK');
        // throw err;
    } finally {
        console.log(stmt);
        // Close the prepared statement.
        await stmt.finalize();
    }
}

/**
 * Inserts the score into the database.
 * @returns {Promise<void>}
 */
async function insertScore() {
    const db = await openDB();
    await db.run(`
        INSERT OR IGNORE INTO score (user_id)
        VALUES (1)
    `);
    await db.close();
}

export { insertAulas, insertMaterials, insertScore }