import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import BreakingNewsContainer from '../../components/BreakingNewsContainer';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SideBar from '../../components/SideBar';
import { getMainArticles } from '../../features/articles/articlesSlice';
import ArticlesContainer from '../../components/ArticlesContainer';
import { getSubmittedArticles } from '../../features/articles/articlesSlice';

const AdminArticles: React.FC = () => {
  const dispatch = useAppDispatch();

  const { status } = useSelector((state: RootState) => state.articles);

  useEffect(() => {
    dispatch(getSubmittedArticles());
  }, []);

  return (
    <SideBar>
      <div className="w-full h-full">
        <div className="w-full flex flex-wrap justify-center xl:justify-start mt-10">
          <ArticlesContainer />
        </div>
      </div>
    </SideBar>
  );
};

export default AdminArticles;
