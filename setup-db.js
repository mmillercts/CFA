import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function setupTable() {
  try {
    const result = await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `;
    console.log('Table creation result:', result);
    console.log('Table created!');
  } catch (error) {
    console.error('Table creation failed:', error);
    throw error;
  }
}

setupTable();