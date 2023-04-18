import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BreakingNewsContainer from '../../components/BreakingNewsContainer';
import Topbar from '../../components/Topbar';
import { getTestNews } from '../../features/news/newsSlice';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTestNews());
  }, []);
  return (
    <div className="w-full h-full bg-gray-900">
      <div className="fixed top-0 left-0 right-0 z-50">
        <Topbar />
      </div>

      <div className="w-full flex flex-wrap justify-center xl:justify-start mt-20">
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-1">
          <BreakingNewsContainer />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-1">
          <BreakingNewsContainer flex="flex-none" />
        </div>
        <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/3 p-1">
          <BreakingNewsContainer />
        </div>
      </div>
    </div>
  );
}

export default MainPage;
