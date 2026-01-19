import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  userId?: string;
}

interface TasksState {
  tasks: Task[];
  doneTasks: Task[];
  loading: boolean;
  
  // Actions
  addTask: (text: string, userId?: string) => Promise<void>;
  updateTask: (id: string, text: string, userId?: string) => Promise<void>;
  deleteTask: (id: string, userId?: string) => Promise<void>;
  markAsDone: (id: string, userId?: string) => Promise<void>;
  undoTask: (id: string, userId?: string) => Promise<void>;
  deleteFromDone: (id: string, userId?: string) => Promise<void>;
  
  // Load tasks
  loadTasks: (userId?: string) => Promise<void>;
  
  // Clear all (for logout)
  clearTasks: () => void;
}

// Helper functions for localStorage
const STORAGE_KEY = 'doitly_tasks';
const STORAGE_DONE_KEY = 'doitly_done_tasks';

const getLocalTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const getLocalDoneTasks = (): Task[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STORAGE_DONE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLocalTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
};

const saveLocalDoneTasks = (tasks: Task[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_DONE_KEY, JSON.stringify(tasks));
  }
};

export const useTasksStore = create<TasksState>((set, get) => ({
  tasks: [],
  doneTasks: [],
  loading: false,

  addTask: async (text: string, userId?: string) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      userId,
    };

    if (userId) {
      // Save to Supabase
      const { error } = await supabase
        .from('tasks')
        .insert([{
          id: newTask.id,
          text: newTask.text,
          completed: false,
          user_id: userId,
          created_at: newTask.createdAt,
        }]);

      if (error) {
        console.error('Error adding task to Supabase:', error);
        return;
      }
      
      // Reload from Supabase to get the latest state
      await get().loadTasks(userId);
    } else {
      // Save to localStorage - only add once!
      const tasks = [...get().tasks, newTask];
      set({ tasks });
      saveLocalTasks(tasks);
    }
  },

  updateTask: async (id: string, text: string, userId?: string) => {
    if (userId) {
      const { error } = await supabase
        .from('tasks')
        .update({ text })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error updating task:', error);
        return;
      }
      await get().loadTasks(userId);
    } else {
      const tasks = get().tasks.map(task =>
        task.id === id ? { ...task, text } : task
      );
      set({ tasks });
      saveLocalTasks(tasks);
    }
  },

  deleteTask: async (id: string, userId?: string) => {
    if (userId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting task:', error);
        return;
      }
      await get().loadTasks(userId);
    } else {
      const tasks = get().tasks.filter(task => task.id !== id);
      set({ tasks });
      saveLocalTasks(tasks);
    }
  },

  markAsDone: async (id: string, userId?: string) => {
    if (userId) {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: true })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error marking task as done:', error);
        return;
      }
      await get().loadTasks(userId);
    } else {
      const task = get().tasks.find(t => t.id === id);
      if (task) {
        const tasks = get().tasks.filter(t => t.id !== id);
        const doneTask = { ...task, completed: true };
        const doneTasks = [...get().doneTasks, doneTask];
        
        set({ tasks, doneTasks });
        saveLocalTasks(tasks);
        saveLocalDoneTasks(doneTasks);
      }
    }
  },

  undoTask: async (id: string, userId?: string) => {
    if (userId) {
      const { error } = await supabase
        .from('tasks')
        .update({ completed: false })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error undoing task:', error);
        return;
      }
      await get().loadTasks(userId);
    } else {
      const task = get().doneTasks.find(t => t.id === id);
      if (task) {
        const doneTasks = get().doneTasks.filter(t => t.id !== id);
        const undoneTask = { ...task, completed: false };
        const tasks = [...get().tasks, undoneTask];
        
        set({ tasks, doneTasks });
        saveLocalTasks(tasks);
        saveLocalDoneTasks(doneTasks);
      }
    }
  },

  deleteFromDone: async (id: string, userId?: string) => {
    if (userId) {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) {
        console.error('Error deleting done task:', error);
        return;
      }
      await get().loadTasks(userId);
    } else {
      const doneTasks = get().doneTasks.filter(task => task.id !== id);
      set({ doneTasks });
      saveLocalDoneTasks(doneTasks);
    }
  },

  loadTasks: async (userId?: string) => {
    set({ loading: true });

    if (userId) {
      // Load from Supabase
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error loading tasks from Supabase:', error);
        set({ loading: false });
        return;
      }

      const tasks = data
        ?.filter(t => !t.completed)
        .map(t => ({
          id: t.id,
          text: t.text,
          completed: false,
          createdAt: t.created_at,
          userId: t.user_id,
        })) || [];

      const doneTasks = data
        ?.filter(t => t.completed)
        .map(t => ({
          id: t.id,
          text: t.text,
          completed: true,
          createdAt: t.created_at,
          userId: t.user_id,
        })) || [];

      set({ tasks, doneTasks, loading: false });
    } else {
      // Load from localStorage
      const tasks = getLocalTasks();
      const doneTasks = getLocalDoneTasks();
      set({ tasks, doneTasks, loading: false });
    }
  },

  clearTasks: () => {
    set({ tasks: [], doneTasks: [] });
  },
}));
