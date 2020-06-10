import axios from 'axios'
import Vue from 'vue'
import  store from './store/index'
const http = axios.create({
	baseURL: 'http://localhost:3000/admin/api'



})



http.interceptors.request.use(function (config) {
	if (localStorage.token) {
		config.headers.Authorization = 'Bearer ' + (localStorage.token || "")
		console.log(config.headers)
	}
	// Do something before request is sent
	return config;
}, 
function (error) {
	// Do something with request error
	return Promise.reject(error);
}
);



http.interceptors.response.use(res=>{
	// if(res.data.message !== "用户名可用"){
	// 	Vue.prototype.$notify.success(res.data.message)
	// }

	if(res.data.message == "删除食物成功"){
		res.data.message &&Vue.prototype.$notify.success(res.data.message)
	}else{
		res.data.message &&Vue.prototype.$notify.success(res.data.message)
	}
	return res
},err =>{
	if(err.response.status == 422){
		Vue.prototype.$notify.error(err.response.data.message)
	}

	console.dir(err.response.data.message)
	return Promise.reject(err)
}


)

export default http