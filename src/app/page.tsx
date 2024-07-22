import { Card } from "@/components/ui/card";
import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { DisplayTasks } from "./components/tasks/displayTasks";

export default function Home() {
  return (
    <Card className="flex flex-col justify-between min-h-screen w-full">
      <Header />
      <DisplayTasks />
      <Footer />
    </Card>
  );
}
