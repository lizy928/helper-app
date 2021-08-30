import {request} from './request.js'

// 创建日记
export const add = (data) => {
	let requestParams = {}
	requestParams.url = "app/eventReminder"
	requestParams.method = "POST"
	requestParams.data = data
	return request(requestParams);
}

// 打卡日记列表
export const list = (data) => {
	let requestParams = {}
	requestParams.url = "app/eventReminder"
	requestParams.method = "GET"
	requestParams.data = data
	return request(requestParams);
}

// 删除日记
export const del = (id) => {
	let requestParams = {}
	requestParams.url = "app/eventReminder/" + id
	requestParams.method = "DELETE"
	requestParams.data = {}
	return request(requestParams);
}

// 更新日记
export const update = (data, id) => {
	let requestParams = {}
	requestParams.url = "app/eventReminder/" + id
	requestParams.method = "PUT"
	requestParams.data = data
	return request(requestParams);
}