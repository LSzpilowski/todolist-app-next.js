'use client';

import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { DisplayTasks } from "./components/tasks/displayTasks";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-background via-background to-secondary/20">
      <Header />
      <div className="container mx-auto px-4 md:px-6 lg:px-8 flex flex-col flex-1">
        <main className="flex-1">
          <DisplayTasks />
        </main>
        <Footer />
      </div>
    </div>
  );
}
