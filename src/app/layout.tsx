import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}