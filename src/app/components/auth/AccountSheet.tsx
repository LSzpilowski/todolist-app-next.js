import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, TrendingUp, CheckCircle, ListTodo, Archive, FileText, Calendar, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuthStore } from "@/store/authStore";
import { useTasksStore } from "@/store/tasksStore";

export const AccountSheet: React.FC = () => {
  const { user, signOut } = useAuthStore();
  const { getStats } = useTasksStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    React.startTransition(() => {
      setMounted(true);
    });
  }, []);

  const stats = mounted ? getStats() : {
    totalTasksCreated: 0,
    activeTasksCount: 0,
    completedTasksCount: 0,
    deletedTasksCount: 0,
    archivedTasksCount: 0,
    templatesCount: 0,
    completionRate: 0,
    activeVsCompletedRatio: 0,
  };

  if (!user) return null;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 hover:bg-white/10" aria-label="Open account">
          <User className="h-5 w-5" />
          Account
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="max-h-screen w-full sm:max-w-lg overflow-y-auto bg-black">
        <SheetHeader>
          <SheetTitle>Account & Statistics</SheetTitle>
          <SheetDescription>
            View your productivity stats and manage your account.
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* User Info */}
          <Card className="border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-3">
                {user.user_metadata?.avatar_url ? (
                  <Image 
                    src={user.user_metadata.avatar_url} 
                    alt="Avatar" 
                    width={64}
                    height={64}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold truncate">
                    {user.user_metadata?.full_name || 'User'}
                  </h3>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Statistics */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Your Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Total Tasks Created */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Total Created</p>
                      <p className="text-3xl font-bold">{stats.totalTasksCreated}</p>
                    </div>
                    <Calendar className="h-8 w-8 text-blue-500 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Active Tasks */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Active Tasks</p>
                      <p className="text-3xl font-bold text-blue-600">{stats.activeTasksCount}</p>
                    </div>
                    <ListTodo className="h-8 w-8 text-blue-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Completed Tasks */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Completed</p>
                      <p className="text-3xl font-bold text-green-600">{stats.completedTasksCount}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Completion Rate */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Completion Rate</p>
                      <p className="text-3xl font-bold text-purple-600">{stats.completionRate.toFixed(0)}%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-purple-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Archived Tasks */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Archived</p>
                      <p className="text-3xl font-bold text-gray-600">{stats.archivedTasksCount}</p>
                    </div>
                    <Archive className="h-8 w-8 text-gray-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>

              {/* Templates */}
              <Card className="border-2 hover:shadow-md transition-all">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Templates</p>
                      <p className="text-3xl font-bold text-orange-600">{stats.templatesCount}</p>
                    </div>
                    <FileText className="h-8 w-8 text-orange-600 opacity-80" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Average Completion Time */}
            {stats.averageCompletionTime && (
              <Card className="border-2">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Completion Time</p>
                      <p className="text-2xl font-bold mt-1">
                        {Math.round(stats.averageCompletionTime / (1000 * 60 * 60))} hours
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Monthly Stats */}
            {stats.monthlyTasksCreated && Object.keys(stats.monthlyTasksCreated).length > 0 && (
              <Card className="border-2">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Created</p>
                      <p className="text-2xl font-bold">
                        {Object.values(stats.monthlyTasksCreated)[0] || 0}
                      </p>
                    </div>
                    {stats.monthlyTasksCompleted && (
                      <div>
                        <p className="text-sm text-muted-foreground">Completed</p>
                        <p className="text-2xl font-bold">
                          {Object.values(stats.monthlyTasksCompleted)[0] || 0}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sign Out Button */}
          <Button 
            onClick={signOut} 
            variant="outline" 
            className="w-full gap-2"
            size="lg"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
