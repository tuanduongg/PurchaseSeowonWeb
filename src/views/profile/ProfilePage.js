// material-ui
import { Box, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SubCard from 'ui-component/cards/SubCard';
import CardInfoUser from './component/CardInfoUser';
import { useEffect } from 'react';
import restApi from 'utils/restAPI';
import { DefineRouteApi } from 'DefineRouteAPI';
import { useState } from 'react';
import CustomLoading from 'ui-component/loading/CustomLoading';
import Loader from 'ui-component/Loader';
import PreviewImage from 'ui-component/cards/PreviewImage';

// ==============================|| SAMPLE PAGE ||============================== //

const ProfilePage = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const getDataProfile = async () => {
    setLoading(true);
    const res = await restApi.get(DefineRouteApi.infoUser);
    if (res?.status === 200) {
      setLoading(false);
      setUser(res?.data);
    }
  };
  useEffect(() => {
    getDataProfile();
  }, []);
  return (
    <>
      <Box sx={{ width: { xs: '100%', md: '60%' }, margin: 'auto' }}>
        <CardInfoUser user={user} />
      </Box>
      {loading && <Loader />}
      <CustomLoading open={loading} />
      {/* <PreviewImage /> */}
    </>
  );
};

export default ProfilePage;
