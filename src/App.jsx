import { Header } from './components/Header';
import { Footer } from './components/Footer'
import { DisplayTasks } from './components/Tasks/DisplayTasks/DisplayTasks';
import * as S from './App.styles'
import { SpeedInsights } from '@vercel/speed-insights/react';



export const App = () => {
  return (
  <S.Wrapper>
    <Header />
    <DisplayTasks />
    <Footer />
    <SpeedInsights/>
  </S.Wrapper>
  );
}

export default App;
