import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BreakingNewsContainer from '../../components/BreakingNewsContainer';
import Topbar from '../../components/Topbar';
import { getTestNews } from '../../features/news/newsSlice';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SideBar from '../../components/SideBar';
import { useState } from 'react';
import TickerTapeWidget from '../../components/TradingViewTT';

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  useEffect(() => {
    dispatch(getTestNews());
  }, []);

  return (
    <SideBar>
      <div className="w-full h-full">
        <TickerTapeWidget />
        <div className="w-full flex flex-wrap justify-center xl:justify-start mt-10">
          <BreakingNewsContainer />
        </div>
      </div>
    </SideBar>
  );
};

export default MainPage;
