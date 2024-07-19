import { Footer } from "./components/footer";
import { Header } from "./components/header";
import { DisplayTasks } from "./components/tasks/displayTasks";


export default function Home() {
  return (
<div className='flex flex-col justify-center items-stretch min-h-full overflow-y-auto '>
<Header />
<DisplayTasks />
<Footer />
</div>
  );
}