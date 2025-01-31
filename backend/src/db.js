const pg = require("pg");
const env = require("dotenv");

env.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,  
    port: process.env.DB_PORT,
});

db.connect();

db.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
});

// Fix: Correctly export the query function
const query = async (queryText, values) => {
    try {
        const result = await db.query(queryText, values);
        return result;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    }
};

module.exports = { db, query }; // Export both the database client and query function
