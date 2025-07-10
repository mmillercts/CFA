import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  const sql = neon(process.env.DATABASE_URL);

  if (event.httpMethod === 'GET') {
    // Get all employees
    const employees = await sql('SELECT * FROM employees');
    return {
      statusCode: 200,
      body: JSON.stringify(employees),
    };
  } else if (event.httpMethod === 'POST') {
    // Add a new employee
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

  return { statusCode: 405, body: 'Method Not Allowed' };
}