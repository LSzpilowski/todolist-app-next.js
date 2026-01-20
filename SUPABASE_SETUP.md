# Supabase Database Setup Instructions

This document explains how to set up the database for the DoItly application.

## Quick Start

### If you already have the old SQL files in Supabase SQL Editor:

1. **Delete the old files:**
   - Go to Supabase Dashboard → SQL Editor
   - Delete "User-scoped Tasks with RLS and Auto-updated Timestamps"
   - Delete "Tasks Schema Migration"

2. **Add the new complete schema:**
   - In SQL Editor, click "New Query"
   - Copy the entire contents of `supabase/complete-schema.sql`
   - Paste and click "Run" (or press Ctrl/Cmd + Enter)
   - Done! ✅

### If you're setting up a fresh Supabase project:

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy the entire contents of `supabase/complete-schema.sql`
4. Paste and click "Run"
5. Done! ✅

## What's Included

The `complete-schema.sql` file contains everything you need:

1. **Tasks Table** - with all columns (id, user_id, text, status, is_template, timestamps)
2. **Indexes** - for fast queries on user_id, status, is_template, created_at
3. **Row Level Security (RLS)** - ensures users can only access their own data
4. **RLS Policies** - SELECT, INSERT, UPDATE, DELETE policies
5. **Auto-update Trigger** - automatically updates `updated_at` timestamp
6. **Delete Account Function** - GDPR-compliant account deletion

## Database Schema

```sql
tasks (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'deleted', 'archived')),
  is_template BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  archived_at TIMESTAMPTZ
)
```

## Verifying Your Setup

After running the SQL, verify everything works:

```sql
-- Check if the table exists with correct columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'tasks';

-- Check if RLS policies exist
SELECT * FROM pg_policies WHERE tablename = 'tasks';

-- Check if the delete function exists
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'delete_user_account';
```

## How to View Your Data

### In Supabase Dashboard:

1. Go to **Table Editor** in the left sidebar
2. Select `tasks` table
3. You'll see all tasks with their columns

### Using SQL:

```sql
-- View all your tasks
SELECT * FROM tasks WHERE user_id = auth.uid();

-- Count tasks by status
SELECT status, COUNT(*) 
FROM tasks 
WHERE user_id = auth.uid() 
GROUP BY status;

-- View your templates
SELECT * FROM tasks WHERE user_id = auth.uid() AND is_template = true;
```

## GDPR Compliance

The `delete_user_account()` function ensures GDPR compliance by:
- Permanently deleting all user tasks
- Removing the user account from authentication
- Cascading deletion of all related data
- Implementing "Right to be Forgotten"

When a user clicks "Delete Account" in the app, this function is called automatically.

## Troubleshooting

### "relation tasks does not exist"
- Run the table creation SQL from the "For New Supabase Projects" section

### "column status does not exist"
- Your table uses the old schema
- Run the migration SQL (second file)

### "function delete_user_account does not exist"
- Run `supabase/delete-account-function.sql`

### RLS policy errors
- Make sure RLS is enabled: `ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;`
- Verify policies exist with the query from "Verifying Your Setup"

## Support

For issues with Supabase setup, check:
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Discord](https://discord.supabase.com)
