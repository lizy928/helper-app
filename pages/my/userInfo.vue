<template>
	<view class="container">
		<view class="ui-all">
			<view class="ui-list">
				<avatar
					:bgImage="imgBg"
					selWidth="200px" selHeight="200px"  ref='avatar'
					:avatarSrc="avatarUrl" @upload="myUpload" quality="1" inner=true
					avatarStyle="width: 100px; height: 100px; margin-left: 60px">
					<text v-if="avaterUrl">修改头像</text>
					<text v-if="!avaterUrl">上传头像</text>
				</avatar>
			</view>
			<view class="ui-list">
				<text>昵称</text>
				<input type="text" :placeholder="value" :value="nickName" @input="bindnickName" placeholder-class="place" />
			</view>
			<view class="ui-list right">
				<text>性别</text>
				<picker @change="bindPickerChange" mode='selector' range-key="name" :value="index" :range="sex">
					<view class="picker">
						{{sex[index].name}}
					</view>
				</picker>
			</view>
			</view>
			<button class="save" @tap="savaInfo">保 存 修 改</button>
		</view>

	</view>
</template>

<script>
	import {baseUrl} from '../../api/http.js'
	import {updateUserInfo} from '../../api/api.js'
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				value: '请填写',
				sex: [{
					id: 0,
					name: '男'
				}, {
					id: 1,
					name: '女'
				}],
				index: 0,
				region: ['请填写'],
				date: '请填写',
				avaterUrl: '',
				description: '',
				url: '',
				nickName: '',
				mobile: '',
				headimg: '',
				avatarUrl: '../../static/img/avatar.jpeg',
				imgBg: '../../static/img/bg_01.jpeg'
			}
		},
		methods: {
			clk(index) {
				this.$refs.avatar.fChooseImg(index,{
					selWidth: "300upx", selHeight: "300upx",
					expWidth: '260upx', expHeight: '260upx'
				});
			},
			myUpload(rsp) {
				let that = this
				that.avatarUrl = rsp.path;
				uni.uploadFile({
					header: {
						Token: uni.getStorageSync('token')
					},
					url: baseUrl+'app/file/upload',
					filePath: rsp.path,
					name: 'file',
					formData: {
						'file': rsp.path
					},
					success: (res) => {
						var data = JSON.parse(res.data);
						data = data.data;
						let hederUrl = baseUrl + 'app/file/' + data.fileName;
						that.headimg = data.fileName
						that.avaterUrl = hederUrl
						let userInfo = uni.getStorageSync("userInfo")
						userInfo.avatar = data.fileName
						uni.setStorageSync("userInfo", userInfo)
					},
					complete(res) {
						console.log(res)
					}
				});
				
			},
			bindPickerChange(e) {
				this.index = e.detail.value;
				
			},
			bindRegionChange(e) {
				this.region = e.detail.value;
				
			},
			bindDateChange(e) {
				this.date = e.detail.value;
				
			},
			bindnickName(e) {
				this.nickName = e.detail.value;
				
			},
			bindmobile(e) {
				this.mobile = e.detail.value;
				
			},
			binddescription(e) {
				this.description = e.detail.value;
				
			},
			 getUserInfo () {
				  uni.getUserProfile({
			      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
			      success: (res) => {
			       console.log(res);
				   uni.showToast({
							   title: '已授权',
							   icon: 'none',
							   duration: 2000
							   }) 
			      }
			    })
			    } ,
				 getphonenumber(e){
					if(e.detail.iv){
					  console.log(e.detail.iv) //传后台解密换取手机号
						  uni.showToast({
							   title: '已授权',
							   icon: 'none',
							   duration: 2000
							   }) 
					}
								  },
			savaInfo() {
				let that = this;
				let nickname = that.nickName;
				let headimg = that.headimg;
				let sex = that.index;
				let mobile = that.mobile;
				let region = that.region;
				let birthday = that.date;
				let description = that.description;
				let updata = {};
				if (!nickname) {
					uni.showToast({
						title: '请填写昵称',
						icon: 'none',
						duration: 2000
					});
					return;
				}
				updata.nickname = nickname;
				if (headimg) {
					updata.avatar = headimg;
				}
				debugger
				updata.sex = sex;
				updata.birthday = birthday;
				updata.description = description;
				that.updata(updata);
			},
			async updata(datas) {
				//传后台
				debugger
				updateUserInfo(datas)
				.then((res)=>{
					if(res.data.code === 200){
						uni.showToast({
							icon: "success",
							title: "保存成功"
						})
						uni.setStorageSync("userInfo", res.data.data)
					}
				})
				.catch((erroe)=>{	
				})
			},
			imgUpload(file) {
				let that = this;
				uni.uploadFile({
					header: {
						Token: uni.getStorageSync('token')
					},
					url:baseUrl+'app/file/upload', //需传后台图片上传接口
					filePath: file[0],
					name: 'file',
					formData: {
						type: 'file'
					},
					success: function(res) {
						var data = JSON.parse(res.data);
						data = data.data;
						let hederUrl = baseUrl + 'app/file/' + data.fileName;
						that.headimg = data.fileName
						that.avater = hederUrl
						let userInfo = uni.getStorageSync("userInfo")
						userInfo.avatar = data.fileName
						uni.setStorageSync("userInfo", userInfo)
					},
					fail: function(error) {
						console.log(error);
					}
				});
			},
		},
		onShow() {	
			const userInfo = uni.getStorageSync('userInfo'); 
			if(userInfo.avatar){
				this.avatarUrl = baseUrl + 'app/file/' + userInfo.avatar
			}
			if(userInfo.sex){
				this.index = userInfo.sex
			}
			this.nickName = userInfo.nickName
		}

	}
</script>

<style lang="less">
	.container {
		display: block;
	}

	.ui-all {
		padding: 20rpx 40rpx;

		.avatar {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			.imgAvatar {
				width: 140rpx;
				height: 140rpx;
				border-radius: 50%;
				display: inline-block;
				vertical-align: middle;
				overflow: hidden;

				.iavatar {
					width: 100%;
					height: 100%;
					display: block;
				}
			}

			text {
				display: inline-block;
				vertical-align: middle;
				color: #8e8e93;
				font-size: 28rpx;
				margin-left: 40rpx;
			}

			&:after {
				content: ' ';
				width: 20rpx;
				height: 20rpx;
				border-top: solid 1px #030303;
				border-right: solid 1px #030303;
				transform: rotate(45deg);
				-ms-transform: rotate(45deg);
				/* IE 9 */
				-moz-transform: rotate(45deg);
				/* Firefox */
				-webkit-transform: rotate(45deg);
				/* Safari 和 Chrome */
				-o-transform: rotate(45deg);
				position: absolute;
				top: 85rpx;
				right: 0;
			}
		}

		.ui-list {
			width: 100%;
			text-align: left;
			padding: 20rpx 0;
			border-bottom: solid 1px #f2f2f2;
			position: relative;

			text {
				color: #4a4a4a;
				font-size: 28rpx;
				display: inline-block;
				vertical-align: middle;
				min-width: 150rpx;
			}

			input {
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
			}
			button{
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				background: none;
				margin: 0;
				padding: 0;
				&::after{
					display: none;
				}
			}
			picker {
				width: 90%;
				color: #030303;
				font-size: 30rpx;
				display: inline-block;
				vertical-align: middle;
				position: absolute;
				top: 30rpx;
				left: 150rpx;
			}

			textarea {
				color: #030303;
				font-size: 30rpx;
				vertical-align: middle;
				height: 150rpx;
				width: 100%;
				margin-top: 50rpx;
			}

			.place {
				color: #999999;
				font-size: 28rpx;
			}
		}

		.right:after {
			content: ' ';
			width: 20rpx;
			height: 20rpx;
			border-top: solid 1px #030303;
			border-right: solid 1px #030303;
			transform: rotate(45deg);
			-ms-transform: rotate(45deg);
			/* IE 9 */
			-moz-transform: rotate(45deg);
			/* Firefox */
			-webkit-transform: rotate(45deg);
			/* Safari 和 Chrome */
			-o-transform: rotate(45deg);
			position: absolute;
			top: 40rpx;
			right: 0;
		}

		.save {
			background: #030303;
			border: none;
			color: #ffffff;
			margin-top: 40rpx;
			font-size: 28rpx;
		}
	}
</style>
