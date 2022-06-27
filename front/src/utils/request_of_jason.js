import axios from "axios";

const request_of_jason = axios.create({
    baseURL:'/api',
    timeout:5000
})

request_of_jason.interceptors.request.use(config=>{
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    // config.headers['token'] = user.token;  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

request_of_jason.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        return res;
    },
    error => {
        console.log('err' + error) // for debug
        console.log(error.response)
        return Promise.reject(error)
    }
)

export default request_of_jason