import {baseUrl} from './http.js'

//带Token请求 
export const request = (opts) => {
	//此token是登录成功后后台返回保存在storage中的
	const token = uni.getStorageSync('token'); //获取token
	let httpDefaultOpts = {
		url: baseUrl + opts.url,
		method: opts.method,
		data: opts.data,
		header: {
			'Token': token,
		},
		dataType: 'json',
	}
	let promise = new Promise(function(resolve, reject) {
		uni.request(httpDefaultOpts).then(
			(res) => {
				console.log("res:" + res)
				resolve(res[1])
				let code = res[1].statusCode;
				if(code === 200){
					if(res[1].data.code === 200){
						resolve(res[1])
					} else {
						if(res[1].data.code === 401){
							uni.showToast({
								title: "登录信息失效！"
							})
							uni.navigateTo({
								url: '/pages/login/login'
							})
						} else {
							uni.showToast({
								icon: "error",
								title: res[1].data.message,
								duration: 3000
							})
						}
						return
					}
				} else {
					uni.showToast({
						icon: "error",
						title: "请求失败!",
						duration: 3000
					})
				}
				
			}
		).catch(
			(response) => {
				console.log("response:"+response)
				uni.showToast({
					icon: "error",
					title: "网络错误!",
					duration: 3000
				})
				reject(response)
			}
		)
	})
	return promise
};



// 上传图片封装
function uploadFile(obj) {
	let url = baseUrl + 'file-list/uploadImage'; //服务器地址
	let filePath = obj.filePath; //要上传文件资源的路径。
	let formData = obj.formData || {
		'user': 'test'
	};
	let success = obj.success;
	let name = obj.name || 'filePath'; //文件对应的 key 
	let method = obj.method || 'POST'; //默认post请求
	uni.uploadFile({
		url: url,
		filePath: filePath,
		name: name,
		formData: formData,
		header: {
			'token': token,
		},
		success: function(res) {
			success(res)
		},
		fail: function(res) {},
		complete: function(res) {},
	})
}
/* export default {
	request: request,
	uploadFile: uploadFile
}; */
