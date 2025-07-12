const { Client } = require('pg');
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };
  const data = JSON.parse(event.body);
  const client = new Client({
    connectionString: process.env.NEON_CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
  });
  try {
    await client.connect();
    await client.query(
      'INSERT INTO cards (title, content, image_url) VALUES ($1, $2, $3)',
      [data.title, data.content, data.image_url]
    );
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ message: "Card added!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};