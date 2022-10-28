import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootState, store } from './app/store';
import PageView from './containers/PageView';
import { getTestNews } from './features/news/newsSlice';
import MainPage from './pages/MainPage';

function App(): JSX.Element {
  return (
    <PageView>
      <MainPage />
    </PageView>
  );
}

export default App;
