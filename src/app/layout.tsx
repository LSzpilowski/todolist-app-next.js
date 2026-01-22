import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./theme-provider";
import { AuthProvider } from "./components/auth/AuthProvider";
import { TasksProvider } from "./components/tasks/TasksProvider";
import { SignInReminder } from "./components/tasks/MigrationDialog";
import { SupabaseStatus } from "./components/SupabaseStatus";
import "@/styles/globals.css"
import { fontSans } from "@/lib/fonts";

export const metadata: Metadata = {
  title: {
    default: "DoItly - Minimal Task Management App",
    template: "%s | DoItly",
  },
  description: "No priorities. No deadlines. Just do it. A minimalistic task management app with dual data persistence: localStorage for guest users and Supabase for authenticated users, supporting seamless offline-to-online transitions.",
  keywords: ["task management", "todo app", "minimalist", "productivity", "Next.js", "Supabase", "GDPR compliant"],
  authors: [{ name: "LSzpilowski" }],
  creator: "LSzpilowski",
  metadataBase: new URL("https://doitly.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://doitly.vercel.app",
    title: "DoItly - Minimal Task Management App",
    description: "No priorities. No deadlines. Just do it. A minimalistic task management app with authentication, templates, and GDPR-compliant privacy controls.",
    siteName: "DoItly",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DoItly - Minimal Task Management App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DoItly - Minimal Task Management App",
    description: "No priorities. No deadlines. Just do it.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
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
              <SupabaseStatus />
              {children}
            </TasksProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}