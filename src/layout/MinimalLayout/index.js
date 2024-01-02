import { Navigate, Outlet, useLocation } from 'react-router-dom';

// project imports
import Customization from '../Customization';
import { useEffect } from 'react';
import { getCookie } from 'utils/helper';
import config from '../../config';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { ConfigPath } from 'routes/DefinePath';
import { useDispatch, useSelector } from 'react-redux';
import { CHECK_LOGIN, MENU_OPEN } from 'store/actions';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const dispatch = useDispatch();

  const checkToken = async () => {
    const response = await restApi.get(DefineRouteApi.profile);
    if (response?.status === 200) {
      dispatch({ type: CHECK_LOGIN, isLogin: true });
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  if (customization?.isLogin) {
    const url = location.state?.from?.pathname || ConfigPath.home;
    dispatch({ type: MENU_OPEN, id: url });
    return <Navigate to={url} />;
  }
  return (
    <>
      <Outlet />
      <Customization />
    </>
  );
};

export default MinimalLayout;
