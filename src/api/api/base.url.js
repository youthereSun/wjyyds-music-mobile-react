export const BASE_URL = (function() {
  let url = '';
  switch (process.env.NODE_ENV) {
    case 'development':
      url = 'api/'; //这里是本地的请求url,对应vue应用在本地的port
      break;
    case 'production':
      url ='https://wjyyds-music-api.vercel.app/'; //生产环境url
      break;
  }
  return url;
})();
