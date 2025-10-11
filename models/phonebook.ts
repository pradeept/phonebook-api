import type { User } from "../types/userType.ts";
import { pool } from "../configs/db.ts";

export const getEntries = async (user: User) => {
  const fetchQuery = `
    SELECT p.name, p.email, p.phone FROM phonebookapp.phonebook as p join phonebookapp.user as u on p.owner = $1;
  `;

  try {
    const result = await pool.query(fetchQuery, [user.id]);
    return result;
  } catch (error) {
    console.error("Error inserting phone book entry:", error);
    throw error;
  }
};

export const createEntry = async (
  name: string,
  email: string,
  phone: string
) => {
  const insertQuery = `
    INSERT INTO phonebookapp.phonebook (name, email, phone)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const result = await pool.query(insertQuery, [name, email, phone]);
    return result.rows[0];
  } catch (error) {
    console.error("Error inserting phone book entry:", error);
    throw error;
  }
};

export const deleteEntry = async (id: string) => {
  const deleteQuery = `
    DELETE FROM phonebook WHERE id=${id} RETURNING *
   `;
  try {
    const result = await pool.query(deleteQuery);
    return result;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const editEntry = async (
  id: string,
  name?: string,
  email?: string,
  phone?: string
) => {
  const fields = [];
  const values = [];
  let index = 1;

  if (name !== undefined) {
    fields.push(`name = $${index++}`);
    values.push(name);
  }

  if (email !== undefined) {
    fields.push(`email = $${index++}`);
    values.push(email);
  }

  if (phone !== undefined) {
    fields.push(`phone = $${index++}`);
    values.push(phone);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided to update.");
  }

  values.push(id);

  const query = `
    UPDATE phonebook
    SET ${fields.join(", ")}
    WHERE id = $${index}
    RETURNING *;
  `;

  try {
    const result = await pool.query(query, values);
    return result;
  } catch (e) {
    console.error("Database update failed:", e);
    throw e;
  }
};
