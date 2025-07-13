-- Fix Visits Table Issues
-- Run these commands in your Supabase SQL Editor

-- 1. Check current state
SELECT * FROM visits;

-- 2. If no rows exist, create one:
INSERT INTO visits (visit_count) VALUES (0)
ON CONFLICT DO NOTHING;

-- 3. If multiple rows exist, consolidate them automatically:
DO $$
DECLARE
    total_count INTEGER;
    row_count INTEGER;
BEGIN
    -- Count how many rows we have
    SELECT COUNT(*) INTO row_count FROM visits;
    
    -- If we have multiple rows, consolidate them
    IF row_count > 1 THEN
        -- Get the total count
        SELECT COALESCE(SUM(visit_count), 0) INTO total_count FROM visits;
        
        -- Delete all existing rows
        DELETE FROM visits;
        
        -- Create one consolidated row
        INSERT INTO visits (visit_count) VALUES (total_count);
        
        RAISE NOTICE 'Consolidated % rows into 1 row with total count: %', row_count, total_count;
    ELSE
        RAISE NOTICE 'Visits table already has % row(s) - no consolidation needed', row_count;
    END IF;
END $$;

-- 4. Ensure RLS policies allow public access:
-- Enable RLS on visits table
ALTER TABLE visits ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public select on visits" ON visits;
DROP POLICY IF EXISTS "Allow public insert on visits" ON visits;
DROP POLICY IF EXISTS "Allow public update on visits" ON visits;

-- Create policy to allow public SELECT
CREATE POLICY "Allow public select on visits" ON visits
FOR SELECT USING (true);

-- Create policy to allow public INSERT
CREATE POLICY "Allow public insert on visits" ON visits
FOR INSERT WITH CHECK (true);

-- Create policy to allow public UPDATE
CREATE POLICY "Allow public update on visits" ON visits
FOR UPDATE USING (true) WITH CHECK (true);

-- 5. Verify the fix
SELECT * FROM visits; 