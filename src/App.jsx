import { Header } from './components/Header';
import { Tasks } from './components/Tasks'
import { Footer } from './components/Footer'
import * as S from './App.styles'



export const App = () => {
  return (
  <S.Wrapper>
    <Header />
    <Tasks />
    <Footer />
  </S.Wrapper>
  );
}

export default App;
