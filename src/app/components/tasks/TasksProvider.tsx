'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useTasksStore } from '@/store/tasksStore';

export function TasksProvider({ children }: { children: React.ReactNode }) {
  const { user, initialized } = useAuthStore();
  const { loadTasks } = useTasksStore();

  useEffect(() => {
    if (!initialized) return;

    if (user) {
      // Always load from Supabase when logged in
      loadTasks(user.id);
    } else {
      // Always load from localStorage when guest
      loadTasks();
    }
  }, [user, initialized, loadTasks]);

  return <>{children}</>;
}
