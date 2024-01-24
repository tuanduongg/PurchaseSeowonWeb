const config = {
  // basename: only at build time to set, and Don't add '/' at end off BASENAME for breadcrumbs, also Don't put only '/' use blank('') instead,
  // like '/berry-material-react/react/default'
  basename: '/',
  homePage: '/',
  defaultPath: '/dashboard/default',
  fontFamily: `'Roboto', sans-serif`,
  borderRadius: 5,
  apiUrl: process.env.REACT_APP_API_URL ?? 'http://localhost:8088/api',
  apiImage: process.env.REACT_APP_IMAGE_URL ?? 'http://localhost:8088/',
  DATA_USER: process.env.REACT_APP_DATA_USER ?? 'DATA_USER',
  ASSET_TOKEN: 'asset_token',
  COLOR_MAIN: '#0054a6'
};
export default config;
