import { neon } from '@neondatabase/serverless';
import formidable from 'formidable';

export async function handler(event) {
  try {
    if (event.httpMethod !== 'POST') {
      return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }
    const form = new formidable.IncomingForm();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(event, (err, fields, files) => {
        if (err) reject(err);
        resolve({ fields, files });
      });
    });
    const sql = neon(process.env.DATABASE_URL);
    const { type } = fields; // e.g., 'photos' or 'documents'
    if (!['photos', 'documents'].includes(type)) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid type' }) };
    }
    // Replace with actual storage logic (e.g., upload to S3)
    const fileUrl = 'https://example.com/uploaded-file';
    const result = await sql(
      `INSERT INTO ${type} (url, caption, title) VALUES ($1, $2, $3) RETURNING *`,
      [fileUrl, fields.caption || '', fields.title || '']
    );
    return { statusCode: 200, body: JSON.stringify({ success: true, inserted: result }) };
  } catch (error) {
    console.error('Upload error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}