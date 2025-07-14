-- Create daily_visits table
CREATE TABLE IF NOT EXISTS daily_visits (
  id SERIAL PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  count INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create visitor_locations table
CREATE TABLE IF NOT EXISTS visitor_locations (
  id SERIAL PRIMARY KEY,
  ip VARCHAR(45),
  date DATE NOT NULL,
  country VARCHAR(100),
  region VARCHAR(100),
  city VARCHAR(100),
  note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
); 