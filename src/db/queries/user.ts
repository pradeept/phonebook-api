import type { RegisterRequest } from "../../controllers/authentication.ts";
import { pool } from "../../configs/db.ts";

export const findUser = async (email: string, password: string) => {
  const query = `SELECT * FROM phonebookapp.user WHERE email='${email}'`;
  return pool.query(query).then((result) => {
    if (result.rowCount) {
      return result.rows[0]
    }
    return null;
  });
};

export const createUser = async ({
  firstname,
  lastname,
  email,
  city,
  password,
}: RegisterRequest): Promise<boolean | unknown> => {
  const query = `INSERT INTO phonebookapp.user(first_name, last_name, city, password, email) VALUES($1 , $2, $3, $4, $5) RETURNING *`;

  try {
    const result = await pool.query(query, [
      firstname,
      lastname,
      city,
      password,
      email,
    ]);
    return true;
  } catch (error) {
    throw error;
  }
};
