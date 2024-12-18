import pool from './index';

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(100) NOT NULL,
      password VARCHAR(100) NOT NULL
    );
  `;
  try {
    await pool.query(query);
  } catch (error) {
    throw error;
  }
}

const migration = async () => {
  try {
    await createUserTable();
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed', error);
  }
}

migration().finally(() => pool.end());
