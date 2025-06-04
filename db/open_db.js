import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import path from 'path'

const __dirname = path.resolve()
const databasePath = path.join(__dirname, '../libras/lib/core/database/libras.db')
console.log(databasePath)

/**
 * Opens a connection to the database.
 * @returns {sqlite3.Database} A connection to the database.
 */
async function openDB() {
    return await open({
        // The filename of the database.
        filename: databasePath,
        // The driver to use. This is required.
        driver: sqlite3.Database
    })
}

export default openDB