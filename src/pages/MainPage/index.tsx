import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BreakingNewsContainer from '../../components/BreakingNewsContainer';
import { getTestNews } from '../../features/news/newsSlice';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getTestNews());
  }, []);
  return (
    <section className="w-full  h-full">
      <div className="flex md:flex-column">
        <BreakingNewsContainer />
        <BreakingNewsContainer />
        <BreakingNewsContainer />
      </div>
    </section>
  );
}

export default MainPage;
