import {request} from './request.js'

// 用户登录
export const login = (data) => {
	let requestParams = {}
	requestParams.url = "login"
	requestParams.method = "POST"
	requestParams.data = data
	return request(requestParams);
}


// 用户注册
export const register = (data) => {
	let requestParams = {}
	requestParams.url = "app/user/register"
	requestParams.method = "POST"
	requestParams.data = data
	return request(requestParams);
}



