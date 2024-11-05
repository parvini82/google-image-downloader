const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

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
    } finally {
        client.release();
    }
};

module.exports = saveImageToDatabase;
