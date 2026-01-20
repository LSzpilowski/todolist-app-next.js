-- =============================================================================
-- DoItly Database Schema - Complete Setup
-- =============================================================================
-- This file contains the complete database schema for the DoItly application
-- including tables, indexes, RLS policies, and GDPR-compliant functions.
--
-- Run this file once on a new Supabase project, or use it as reference
-- if your database already exists.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- 1. CREATE TASKS TABLE
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS tasks (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'deleted', 'archived')),
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
);

-- -----------------------------------------------------------------------------
-- 2. CREATE INDEXES FOR PERFORMANCE
-- -----------------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS tasks_user_id_idx ON tasks(user_id);
CREATE INDEX IF NOT EXISTS tasks_status_idx ON tasks(status);
CREATE INDEX IF NOT EXISTS tasks_is_template_idx ON tasks(is_template);
CREATE INDEX IF NOT EXISTS tasks_created_at_idx ON tasks(created_at);

-- -----------------------------------------------------------------------------
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- 4. CREATE RLS POLICIES
-- -----------------------------------------------------------------------------

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can insert own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can update own tasks" ON tasks;
DROP POLICY IF EXISTS "Users can delete own tasks" ON tasks;

-- Users can only view their own tasks
CREATE POLICY "Users can view own tasks" 
  ON tasks FOR SELECT 
  USING (auth.uid() = user_id);

-- Users can only insert their own tasks
CREATE POLICY "Users can insert own tasks" 
  ON tasks FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Users can only update their own tasks
CREATE POLICY "Users can update own tasks" 
  ON tasks FOR UPDATE 
  USING (auth.uid() = user_id);

-- Users can only delete their own tasks
CREATE POLICY "Users can delete own tasks" 
  ON tasks FOR DELETE 
  USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- 5. CREATE AUTOMATIC TIMESTAMP UPDATE FUNCTION
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS update_tasks_updated_at ON tasks;

-- Create trigger to automatically update updated_at timestamp
CREATE TRIGGER update_tasks_updated_at 
  BEFORE UPDATE ON tasks 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- -----------------------------------------------------------------------------
-- 6. CREATE DELETE ACCOUNT FUNCTION (GDPR COMPLIANCE)
-- -----------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION delete_user_account()
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  current_user_id UUID;
  deleted_tasks_count INTEGER;
BEGIN
  -- Get the current authenticated user ID
  current_user_id := auth.uid();
  
  -- Check if user is authenticated
  IF current_user_id IS NULL THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'User not authenticated'
    );
  END IF;

  -- Delete all tasks for this user
  DELETE FROM tasks 
  WHERE user_id = current_user_id;
  
  GET DIAGNOSTICS deleted_tasks_count = ROW_COUNT;

  -- Delete the user from auth.users
  -- This will cascade delete all related data due to ON DELETE CASCADE
  DELETE FROM auth.users 
  WHERE id = current_user_id;

  -- Return success response
  RETURN jsonb_build_object(
    'success', true,
    'deleted_tasks', deleted_tasks_count,
    'message', 'Account and all associated data deleted successfully'
  );

EXCEPTION
  WHEN OTHERS THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', SQLERRM
    );
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION delete_user_account() TO authenticated;

COMMENT ON FUNCTION delete_user_account() IS 
  'Deletes the current user account and all associated data (GDPR compliant - Right to be Forgotten)';

-- -----------------------------------------------------------------------------
-- 7. VERIFICATION QUERIES
-- -----------------------------------------------------------------------------

-- Uncomment these to verify your setup after running:

-- Check table structure
-- SELECT column_name, data_type, is_nullable, column_default
-- FROM information_schema.columns 
-- WHERE table_name = 'tasks'
-- ORDER BY ordinal_position;

-- Check indexes
-- SELECT indexname, indexdef 
-- FROM pg_indexes 
-- WHERE tablename = 'tasks';

-- Check RLS policies
-- SELECT * FROM pg_policies WHERE tablename = 'tasks';

-- Check if delete function exists
-- SELECT routine_name, routine_type
-- FROM information_schema.routines 
-- WHERE routine_name = 'delete_user_account';

-- View your tasks (after logging in)
-- SELECT * FROM tasks WHERE user_id = auth.uid();

-- =============================================================================
-- SETUP COMPLETE!
-- =============================================================================
