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
      'INSERT INTO announcements (title, description, date) VALUES ($1, $2, $3)',
      [data.title, data.description, data.date]
    );
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ message: "Announcement added!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};