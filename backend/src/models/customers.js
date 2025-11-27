import db from "../config/db.js";

export const createCustomerTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS customers (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      phone VARCHAR(50),
      email VARCHAR(255),
      address TEXT,
      city VARCHAR(255),
      state VARCHAR(50),
      zipcode VARCHAR(20),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const addCustomer = async (data) => {
  const { name, phone, email, address, city, state, zipcode } = data;
  const result = await db.query(
    `INSERT INTO customers (name, phone, email, address, city, state, zipcode)
     VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
    [name, phone, email, address, city, state, zipcode]
  );
  return result.rows[0];
};

export const getCustomerById = async (id) => {
  const result = await db.query("SELECT * FROM customers WHERE id=$1", [id]);
  return result.rows[0];
};
