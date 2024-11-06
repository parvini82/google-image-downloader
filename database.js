const { Pool } = require('pg');
require('dotenv').config();


const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

const createImagesTableIfNotExists = async () => {
    const client = await pool.connect();
    try {
        const createTableQuery = `
            CREATE TABLE IF NOT EXISTS images (
                id SERIAL PRIMARY KEY,
                query VARCHAR(255),
                url TEXT,
                data BYTEA
            `;
        ;
        await client.query(createTableQuery);
        console.log("Table 'images' is ready.");
    } catch (error) {
        console.error("Error creating table:", error.message);
    } finally {
        client.release();
    }
};

const saveImageToDatabase = async (query, imageUrl, imageBuffer) => {
    const client = await pool.connect();
    try {
        const insertQuery = `
            INSERT INTO images (query, url, data)
            VALUES ($1, $2, $3)
        `;
        await client.query(insertQuery, [query, imageUrl, imageBuffer]);
        console.log("Image saved to database.");
    } catch (error) {
        console.error("Error saving image to database:", error.message);
    }
};

module.exports = { createImagesTableIfNotExists, saveImageToDatabase, pool };
