import db from "../config/db.js";

export const createVehiclesTable = async () => {
  await db.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id SERIAL PRIMARY KEY,
      customer_id INTEGER REFERENCES customers(id),
      year VARCHAR(10),
      make VARCHAR(50),
      model VARCHAR(50),
      license VARCHAR(50),
      vin VARCHAR(50),
      created_at TIMESTAMP DEFAULT NOW()
    );
  `);
};

export const addVehicle = async (data) => {
  const { customer_id, year, make, model, license, vin } = data;
  const result = await db.query(
    `INSERT INTO vehicles (customer_id, year, make, model, license, vin)
     VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [customer_id, year, make, model, license, vin]
  );
  return result.rows[0];
};
