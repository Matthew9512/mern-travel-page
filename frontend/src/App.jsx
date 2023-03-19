import './assets/App.css';
import { GlobalContextProvider } from './context/GlobalContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { SingleItem } from './pages/SingleItem';
import { Error } from './pages/Error';
import { SpinnerContextProvider } from './context/SpinnerContext';

export const App = () => {
  return (
    <GlobalContextProvider>
      <SpinnerContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />}></Route>
            <Route path={'/search/:id'} element={<SingleItem />}></Route>
            <Route path={'*'} element={<Error />}></Route>
          </Routes>
        </BrowserRouter>
      </SpinnerContextProvider>
    </GlobalContextProvider>
  );
};
