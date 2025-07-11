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
      'INSERT INTO documents (title, description, file_url, file_type, uploaded_by) VALUES ($1, $2, $3, $4, $5)',
      [data.title, data.description, data.file_url, data.file_type, data.uploaded_by]
    );
    await client.end();
    return { statusCode: 200, body: JSON.stringify({ message: "Document added!" }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};