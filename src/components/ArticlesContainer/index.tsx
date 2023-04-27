import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import Spinner from '../Spinner';
import ArticleCard from '../ArticleCard';

function ArticlesContainer(): JSX.Element {
  const { articles, status } = useSelector(
    (state: RootState) => state.articles
  );

  useEffect(() => {}, [articles]);

  return (
    <>
      {status === 'idle' &&
        articles.length &&
        articles.map((item: any) => <ArticleCard key={item.url} {...item} />)}
      {status === 'loading' && <Spinner />}
    </>
  );
}

export default ArticlesContainer;
