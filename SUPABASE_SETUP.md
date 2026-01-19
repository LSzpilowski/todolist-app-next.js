# Supabase Setup Instructions

## 1. Create Tasks Table

Go to your Supabase project dashboard:
1. Navigate to **SQL Editor**
2. Create a new query
3. Copy and paste the entire content from `supabase-setup.sql`
4. Click **Run** to execute

This will create:
- `tasks` table with proper schema
- Row Level Security (RLS) policies
- Indexes for performance
- Automatic timestamp updates

## 2. Configure Redirect URLs

In Supabase Dashboard → **Authentication** → **URL Configuration**:

Add these Redirect URLs:
- `http://localhost:3000/auth/callback`
- `https://doitly.vercel.app/auth/callback`
- `https://hoeworumxsuftkjlzojq.supabase.co/auth/v1/callback`

Set Site URL to: `https://doitly.vercel.app`

## 3. Verify Setup

After running the SQL, verify in **Table Editor**:
- You should see a `tasks` table
- Check that RLS is enabled (shield icon should be visible)

## Schema Overview

```sql
tasks {
  id: UUID (Primary Key)
  user_id: UUID (Foreign Key to auth.users)
  text: TEXT
  completed: BOOLEAN
  created_at: TIMESTAMPTZ
  updated_at: TIMESTAMPTZ
}
```

## Row Level Security

The following policies are automatically created:
- Users can only view their own tasks
- Users can only insert tasks with their own user_id
- Users can only update their own tasks
- Users can only delete their own tasks

This ensures complete data isolation between users.
