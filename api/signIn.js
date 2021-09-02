import {request} from './request.js'

// 创建打卡项目
export const add = (data) => {
	let requestParams = {}
	requestParams.url = "app/signIn"
	requestParams.method = "POST"
	requestParams.data = data
	return request(requestParams);
}

// 打卡项目列表
export const list = (data) => {
	let requestParams = {}
	requestParams.url = "app/signIn"
	requestParams.method = "GET"
	requestParams.data = data
	return request(requestParams);
}

// 删除打卡项目
export const del = (id) => {
	let requestParams = {}
	requestParams.url = "app/signIn/" + id
	requestParams.method = "DELETE"
	requestParams.data = {}
	return request(requestParams);
}

// 打卡项目列表
export const update = (data, id) => {
	let requestParams = {}
	requestParams.url = "app/signIn/" + id
	requestParams.method = "PUT"
	requestParams.data = data
	return request(requestParams);
}


// 打卡项目列表
export const get = (id) => {
	let requestParams = {}
	requestParams.url = "app/signIn/" + id
	requestParams.method = "GET"
	requestParams.data = {}
	return request(requestParams);
}


// 打卡记录列表
export const getRecordDetail = (signInId, data) => {
	let requestParams = {}
	requestParams.url = "app/signInRecord/" + signInId
	requestParams.method = "GET"
	requestParams.data = data
	return request(requestParams);
}


// 打卡
export const addRecord = (data) => {
	let requestParams = {}
	requestParams.url = "app/signInRecord/"
	requestParams.method = "POST"
	requestParams.data = data
	return request(requestParams);
}

