// material-ui
import LOGO from '../assets/images/logo/logo.png';
/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from 'assets/images/logo-dark.svg';
 * import logo from 'assets/images/logo.svg';
 *
 */

// ==============================|| LOGO SVG ||============================== //

const Logo = () => {

  return (
    <img src={LOGO} width={{ with: '90%' }} alt="logo" />
  );
};

export default Logo;
