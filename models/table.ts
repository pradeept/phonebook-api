import { pool } from "./db.ts";

const client = pool.connect();

const createTable = () => {
  client
    .then(async (conn) => {
      try {
        await conn.query("BEGIN");
        await conn.query("CREATE SCHEMA IF NOT EXISTS public;");
        await conn.query(`CREATE TABLE IF NOT EXISTS phonebookapp.user (
                    id SERIAL PRIMARY KEY,
                    first_name VARCHAR(20) NOT NULL,
                    last_name VARCHAR(20) NOT NULL,
                    phone VARCHAR(10) UNIQUE NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                );`);
        await conn.query(`CREATE TABLE IF NOT EXISTS phonebookapp.phonebook (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    email VARCHAR(100) UNIQUE NOT NULL,
                    phone VARCHAR(10) UNIQUE NOT NULL,
                    owner INT, 
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    CONSTRAINT fk_owner FOREIGN KEY (owner) REFERENCES phonebookapp.user(id)
                );`);
        await conn.query("COMMIT");
      } catch (e) {
        console.error(e);
        await conn.query("ROLLBACK");
      } finally {
        conn.release();
      }
    })
    .catch((e) => {
      console.log("Failed to connect to the client");
    });
};

export { createTable };
