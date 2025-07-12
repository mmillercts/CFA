import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  try {
    const sql = neon(process.env.DATABASE_URL);
    if (!sql) {
      throw new Error('Failed to initialize Neon database connection');
    }
    if (event.httpMethod === 'GET') {
      const employees = await sql('SELECT * FROM employees');
      return {
        statusCode: 200,
        body: JSON.stringify(employees),
      };
    } else if (event.httpMethod === 'POST') {
      const { name, role } = JSON.parse(event.body);
      if (!name || !role) {
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Missing name or role' }),
        };
      }
      await sql('INSERT INTO employees (name, role) VALUES ($1, $2)', [name, role]);
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    }
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  } catch (error) {
    console.error('Function error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
    };
  }
}