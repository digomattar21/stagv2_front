import { useEffect } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import SideBar from '../../components/SideBar';
import Settings from '../../components/Settings';

const SettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <SideBar>
      <div className="w-full h-full overflow-x-hidden">
        <div className="w-full flex flex-wrap justify-center xl:justify-start">
          <Settings />
        </div>
      </div>
    </SideBar>
  );
};

export default SettingsPage;
