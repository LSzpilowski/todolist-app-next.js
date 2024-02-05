import { Header } from './components/Header';
import { Footer } from './components/Footer'
import { DisplayTasks } from './components/Tasks/DisplayTasks/DisplayTasks';
import * as S from './App.styles'



export const App = () => {
  return (
  <S.Wrapper>
    <Header />
    <DisplayTasks />
    <Footer />
  </S.Wrapper>
  );
}

export default App;
