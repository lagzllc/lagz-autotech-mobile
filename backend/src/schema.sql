-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);

-- CUSTOMERS
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

-- TECHNICIANS
CREATE TABLE IF NOT EXISTS technicians (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  phone VARCHAR(50),
  email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'available',
  created_at TIMESTAMP DEFAULT NOW()
);

-- VEHICLES
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

-- BOOKINGS
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id),
  vehicle_id INTEGER REFERENCES vehicles(id),
  technician_id INTEGER REFERENCES technicians(id),
  service TEXT,
  notes TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  scheduled_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- INVOICES
CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  booking_id INTEGER REFERENCES bookings(id),
  amount NUMERIC(10,2),
  paid BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
