import {request} from './request.js'

// 打卡日记列表
export const listComment = (data) => {
	let requestParams = {}
	requestParams.url = "app/index/comment"
	requestParams.method = "GET"
	requestParams.data = data
	return request(requestParams);
}