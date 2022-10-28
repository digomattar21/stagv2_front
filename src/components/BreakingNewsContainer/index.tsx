import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

function BreakingNewsContainer(): JSX.Element {
  const { value, status } = useSelector(
    (state: RootState) => state.breakingNews
  );

  useEffect(() => {
    console.log('news', value, status);
  }, [value]);

  return (
    <div className="flex border border-red-500 min-w-1/3 lg:w-1/2 md:w-full sm:w-full">
      moi de dsadasdasdasdsadasddasdsada dassssssssssssssssssssss
      dsdasjdsajdsajds
    </div>
  );
}

export default BreakingNewsContainer;
