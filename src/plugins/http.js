import axios from 'axios'
import qs from 'qs'

let http = axios.create({});

if (process.env.NODE_ENV == 'development') {
  http.defaults.baseURL = 'http://txjs-wechat-hnw.mion.cn/api';

} else if (process.env.NODE_ENV == 'production') {
  http.defaults.baseURL = '';
}

http.defaults.responseType = 'json';
// http.defaults.withCredentials = true;
http.defaults.transformRequest = [function (data) {
  return qs.stringify(data);
}];
// 拦截request,设置全局请求为ajax请求
http.interceptors.request.use((config) => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest',
    // 序列化
    config.data = qs.stringify(config.data);
  // 若是有做鉴权token , 就给头部带上token
  if(localStorage.assessToken){
    // config.headers.Authorization = "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjYyNGRkNDQxOWYzN2MwYzZkZGY1NjgxMGJiOTNjMWE1YjBlNmNkZmZjNjhjYjA5OWJlMDdkZDc4ZGYxMjZhYjQxYWVhNTU4Nzc1NmE5MmVkIn0.eyJhdWQiOiIxIiwianRpIjoiNjI0ZGQ0NDE5ZjM3YzBjNmRkZjU2ODEwYmI5M2MxYTViMGU2Y2RmZmM2OGNiMDk5YmUwN2RkNzhkZjEyNmFiNDFhZWE1NTg3NzU2YTkyZWQiLCJpYXQiOjE1MjU0OTY1NzYsIm5iZiI6MTUyNTQ5NjU3NiwiZXhwIjoxODQxMTE1Nzc2LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.n_6cIHoXtZ6rHF91klW7E97rB4jRSgvSFL8CQljRLI7W3VAfKQ4Bo-W6U9AoWvcD2YTVyPENyuBsiT7QUr7QDBp4YQQU2vQkVD1zZPQjiQl7oRRdbNSSluAnaSvajJuNFXu4MYo445Ezsy9FOQYRU3FpdXWQIJlEZWwEEWx0-7n_rK1b5n0sMYESs5uPA2mvI2Ofu21OfNNoX-p5E6qqlloEiENNjFbWqSundVAIo1hL_EUy_-Zq9HySsA_sd7WBUkRQ91EWiEFG4SL_JRYgyGjmCbDXxsRHM2iuiMjlMpp2ldeTPb3vG8k1cDmDeyvid9W-5uSM1IzOTbXq7NSHuhqA9iXQgGCNmrw_MKN_nDLwYfNogr1VrjXgVHVgmHam0ooibwR80vbO1KfssRWGnSL_VF-pTyS8qr5eilpdWaBLdclAB_ut2wZCrcsH9VGMF_nMTx5X54u8u1EHLHlNZhmeSEZe8kS063ivGIYz875FaQDtLY1QFwQvaB3Jn80aEcMJdpy-SlOsBbI3buWOUNXi69vgQLt-PbeNhKJbIq_hF6trj0bc5Qo84v2NVVmQ97Bt5b0vq4EoGWsvCGqHew-Z5VhNTmwTbZe6OSOtdkdNWfZWkauHxi324yis4pdjWiTlkV_Qb8R83GcwlQUqIjunPJch6OPS_YMfEx_zMKI"
  }else{

  }
  return config
});
// 拦截响应response，并做一些错误处理
http.interceptors.response.use(
  (response) => {
    return response
    const data = response.data

    // 根据返回的code值来做不同的处理（和后端约定）
    switch (data.status) {
      case 'success':

        return data
    }
    // 若不是正确的返回code，且已经登录，就抛出错误
    const err = new Error(data.description)

    err.data = data
    err.response = response

    throw err
  }, function (err) { // 这里是返回状态码不为200时候的错误处理
    console.log(err)
    if(error.response === 401){
      console.log(2)
    }
    if (err && err.response) {

      switch (err.response.status) {
        case 400:
          err.message = '请求错误';
          break;

        case 401:
          err.message = '未授权，请登录';
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
