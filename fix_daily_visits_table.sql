-- Fix Daily Visits Table
-- Run this in your Supabase SQL Editor

-- 1. Create daily_visits table if it doesn't exist
CREATE TABLE IF NOT EXISTS daily_visits (
    id SERIAL PRIMARY KEY,
    date DATE UNIQUE NOT NULL,
    count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable RLS on daily_visits table
ALTER TABLE daily_visits ENABLE ROW LEVEL SECURITY;

-- 3. Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public select on daily_visits" ON daily_visits;
DROP POLICY IF EXISTS "Allow public insert on daily_visits" ON daily_visits;
DROP POLICY IF EXISTS "Allow public update on daily_visits" ON daily_visits;

-- 4. Create policies to allow public access
CREATE POLICY "Allow public select on daily_visits" ON daily_visits
FOR SELECT USING (true);

CREATE POLICY "Allow public insert on daily_visits" ON daily_visits
FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update on daily_visits" ON daily_visits
FOR UPDATE USING (true) WITH CHECK (true);

-- 5. Create visitor_locations table if it doesn't exist
CREATE TABLE IF NOT EXISTS visitor_locations (
    id SERIAL PRIMARY KEY,
    ip TEXT,
    date DATE NOT NULL,
    country TEXT,
    region TEXT,
    city TEXT,
    note TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Enable RLS on visitor_locations table
ALTER TABLE visitor_locations ENABLE ROW LEVEL SECURITY;

-- 7. Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public select on visitor_locations" ON visitor_locations;
DROP POLICY IF EXISTS "Allow public insert on visitor_locations" ON visitor_locations;

-- 8. Create policies to allow public access
CREATE POLICY "Allow public select on visitor_locations" ON visitor_locations
FOR SELECT USING (true);

CREATE POLICY "Allow public insert on visitor_locations" ON visitor_locations
FOR INSERT WITH CHECK (true);

-- 9. Verify tables exist
SELECT 'daily_visits' as table_name, COUNT(*) as row_count FROM daily_visits
UNION ALL
SELECT 'visitor_locations' as table_name, COUNT(*) as row_count FROM visitor_locations; 