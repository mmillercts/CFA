const { Client } = require('pg');
exports.handler = async () => {
  const client = new Client({
    connectionString: process.env.NEON_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    const res = await client.query('SELECT * FROM events ORDER BY event_date DESC');
    await client.end();
    return { statusCode: 200, body: JSON.stringify(res.rows) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};