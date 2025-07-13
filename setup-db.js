import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function setupTables() {
  try {
    // Execute each CREATE TABLE statement separately
    await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS announcements (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        date DATE NOT NULL,
        description TEXT
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS photos (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        caption TEXT,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS documents (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS links (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS cards (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL
      )
    `;
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL
      )
    `;
    console.log('All tables created successfully!');
  } catch (error) {
    console.error('Table creation failed:', error);
    throw error;
  }
}

setupTables();