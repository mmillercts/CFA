import { neon } from '@neondatabase/serverless';

const tableSchemas = {
  employees: { fields: ['name', 'role'], required: ['name', 'role'] },
  announcements: { fields: ['title', 'content', 'created_at'], required: ['title', 'content'] },
  events: { fields: ['title', 'date', 'description'], required: ['title', 'date'] },
  photos: { fields: ['url', 'caption', 'uploaded_at'], required: ['url'] },
  documents: { fields: ['title', 'url', 'uploaded_at'], required: ['title', 'url'] },
  links: { fields: ['title', 'url'], required: ['title', 'url'] },
  cards: { fields: ['title', 'content'], required: ['title', 'content'] },
  users: { fields: ['username', 'password', 'role'], required: ['username', 'password', 'role'] },
};

export async function handler(event) {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not set');
    }
    const sql = neon(process.env.DATABASE_URL);
    console.log('Database initialized with URL:', process.env.DATABASE_URL.replace(/:.*@/, ':****@'));

    // Parse path (e.g., /api/employees or /api/employees/123)
    const pathParts = event.path.split('/').filter(Boolean);
    if (pathParts[0] !== 'api' || !pathParts[1]) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid path' }) };
    }
    const table = pathParts[1];
    const id = pathParts[2]; // Optional ID for update/delete
    if (!tableSchemas[table]) {
      return { statusCode: 400, body: JSON.stringify({ error: `Invalid table: ${table}` }) };
    }

    const method = event.httpMethod;
    let body;
    try {
      body = event.body ? JSON.parse(event.body) : {};
      console.log('Request body:', body);
    } catch (parseError) {
      console.error('JSON parse error:', parseError);
      return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON in request body' }) };
    }

    // CRUD Operations
    if (method === 'GET') {
      if (id) {
        const result = await sql(`SELECT * FROM ${table} WHERE id = $1`, [id]);
        return { statusCode: 200, body: JSON.stringify(result[0] || {}) };
      }
      const result = await sql(`SELECT * FROM ${table}`);
      return { statusCode: 200, body: JSON.stringify(result) };
    } else if (method === 'POST') {
      const { fields, required } = tableSchemas[table];
      for (const field of required) {
        if (!body[field]) {
          return { statusCode: 400, body: JSON.stringify({ error: `Missing required field: ${field}` }) };
        }
      }
      const columns = fields.filter((f) => body[f]).join(', ');
      const values = fields.filter((f) => body[f]).map((_, i) => `$${i + 1}`);
      const params = fields.filter((f) => body[f]).map((f) => body[f]);
      const result = await sql(
        `INSERT INTO ${table} (${columns}) VALUES (${values}) RETURNING *`,
        params
      );
      return { statusCode: 200, body: JSON.stringify({ success: true, inserted: result }) };
    } else if (method === 'PUT' && id) {
      const { fields, required } = tableSchemas[table];
      for (const field of required) {
        if (!body[field]) {
          return { statusCode: 400, body: JSON.stringify({ error: `Missing required field: ${field}` }) };
        }
      }
      const updates = fields
        .filter((f) => body[f])
        .map((f, i) => `${f} = $${i + 1}`)
        .join(', ');
      const params = fields.filter((f) => body[f]).map((f) => body[f]);
      params.push(id);
      const result = await sql(
        `UPDATE ${table} SET ${updates} WHERE id = $${params.length} RETURNING *`,
        params
      );
      return { statusCode: 200, body: JSON.stringify({ success: true, updated: result }) };
    } else if (method === 'DELETE' && id) {
      const result = await sql(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]);
      return { statusCode: 200, body: JSON.stringify({ success: true, deleted: result }) };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  } catch (error) {
    console.error('Function error:', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Internal Server Error' }) };
  }
}