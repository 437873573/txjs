import axios from 'axios'
import qs from 'qs'

let http = axios.create({});

if (process.env.NODE_ENV == 'development') {
  http.defaults.baseURL = 'http://txjs-api-hnw.mion.cn/api';

} else if (process.env.NODE_ENV == 'production') {
  http.defaults.baseURL = '/api';
}

http.defaults.responseType = 'json';
// http.defaults.withCredentials = true;
http.defaults.transformRequest = [function (data) {
  return qs.stringify(data);
}];
// 拦截request,设置全局请求为ajax请求
http.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  // 序列化
  // config.data = qs.stringify(config.data);
  // 若是有做鉴权token , 就给头部带上token
  if (localStorage.getItem('MY_USER_INFO')) {
    config.headers.Authorization = "Bearer " + JSON.parse(localStorage.getItem('MY_USER_INFO')).data.accessToken
  }
  return config
});
// 拦截响应response，并做一些错误处理
http.interceptors.response.use(
  (response) => {
    const data = response.data
    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.status) {
      case 'success':
        return data;
        break;
      case 'fail':
        let mess = '';
        for (var k in data.data) {
          data.data[k].forEach((v, i) => {
            mess += `<p>` + v + `</p>`
          })
        }
        data.mess = mess;
        return data;
        break;
      case 'error':
        data.mess=data.message;
        return data;
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    const err = new Error(data.description)

    err.data = data
    err.response = response

    throw err
  }, function (err) { // 这里是返回状态码不为200时候的错误处理

    if (err && err.response) {

      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;

        case 401:
          err.message = '未授权，请登录';
          if(localStorage.getItem('MY_USER_INFO')){
            localStorage.clear();
            location.reload();
          }
          break;

        case 403:
          err.message = '拒绝访问';
          break;

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`;
          break;

        case 408:
          err.message = '请求超时';
          break;

        case 500:
          err.message = '服务器内部错误';
          break;

        case 501:
          err.message = '服务未实现';
          break;

        case 502:
          err.message = '网关错误';
          break;

        case 503:
          err.message = '服务不可用';
          break;

        case 504:
          err.message = '网关超时';
          break;

        case 505:
          err.message = 'HTTP版本不受支持';
          break;

        default:
          err.message = `连接出错(${err.response.status})!`;
      }
    }
    return Promise.reject(err)
  }
)
axios.install = (Vue) => {
  Vue.prototype.$http = http
}

export default axios
