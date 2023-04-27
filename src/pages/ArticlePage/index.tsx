import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BreakingNewsContainer from '../../components/BreakingNewsContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SideBar from '../../components/SideBar';
import TickerTapeWidget from '../../components/TradingViewTT';
import { getMainArticles } from '../../features/articles/articlesSlice';
import ArticlesContainer from '../../components/ArticlesContainer';

const ArticlePage: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(getMainArticles());
  }, []);

  return (
    <SideBar>
      <div className="w-full h-full">
        <TickerTapeWidget />
        <div className="w-full flex flex-wrap justify-center xl:justify-start mt-10">
          <ArticlesContainer />
        </div>
      </div>
    </SideBar>
  );
};

export default ArticlePage;
