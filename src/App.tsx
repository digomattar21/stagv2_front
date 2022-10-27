import {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { RootState, store } from './app/store';
import { getTestNews } from './features/counter/newsSlice';

function App() {

  const dispatch = useDispatch<typeof store.dispatch>()
  const news = useSelector((state: RootState)=> state.news.value);

  useEffect(()=>{
    dispatch(getTestNews());
  },[])

  return (
    <div className="App">
      <header className="App-header">
      </header>
    </div>
  );
}

export default App;
