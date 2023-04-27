import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import BreakingNewsCard from '../BreakingNewsCard';
import Spinner from '../Spinner';

interface BreakingNewsProps {
  flex?: string;
}

function BreakingNewsContainer({ flex }: BreakingNewsProps): JSX.Element {
  const { news, status } = useSelector(
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {}, [news]);

  return (
    <>
      {status === 'idle' &&
        news.length &&
        news.map((item) => <BreakingNewsCard key={item.url} {...item} />)}
      {status === 'loading' && <Spinner />}
    </>
  );
}

export default BreakingNewsContainer;
