import {request} from './request.js'

// 创建聊天记录
export const list = (data) => {
	let requestParams = {}
	requestParams.url = "app/chatRecord"
	requestParams.method = "GET"
	requestParams.data = data
	return request(requestParams);
}