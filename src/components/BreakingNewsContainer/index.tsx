import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import BreakingNewsCard from '../BreakingNewsCard';

interface BreakingNewsProps {
  flex?: string;
}

function BreakingNewsContainer({ flex }: BreakingNewsProps): JSX.Element {
  const { news, status } = useSelector(
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {
    console.log('news', news, status);
  }, [news]);

  return (
    <div className="">
      {status === 'idle' &&
        news.length &&
        news.map((item) => <BreakingNewsCard key={item.url} {...item} />)}
    </div>
  );
}

export default BreakingNewsContainer;
