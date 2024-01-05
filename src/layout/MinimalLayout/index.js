import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';

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
import { useState } from 'react';
// ==============================|| MINIMAL LAYOUT ||============================== //

const MinimalLayout = () => {
  const [checkLogin, setCheckLogin] = useState(false);
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkToken = async () => {
    const response = await restApi.get(DefineRouteApi.profile);
    if (response?.status === 200) {
      // dispatch({ type: CHECK_LOGIN, isLogin: true });
      // const url = location.state?.from?.pathname || ConfigPath.home;
      // dispatch({ type: MENU_OPEN, id: url });
      navigate(ConfigPath.home);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);
  // if (checkLogin) {
  //   return <Navigate to={ConfigPath.home} />;
  // }
  return (
    <>
      <Outlet />
      <Customization />
    </>
  );
};

export default MinimalLayout;
