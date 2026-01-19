import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { TasksProvider } from "./components/tasks/TasksProvider";
import { SignInReminder } from "./components/tasks/MigrationDialog";
import { Toaster } from "sonner";
import "@/styles/globals.css"
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "TodoListApp",
    template: `TodoListApp`,
  },
  description: "Simple TodoList App - learning purpose",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(fontSans.className, "min-h-screen antialiased w-full")}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system">
          <AuthProvider>
            <TasksProvider>
              <SignInReminder />
              {children}
              <Toaster position="bottom-right" richColors closeButton />
            </TasksProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}