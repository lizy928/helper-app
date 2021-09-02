<template>
	<view class="center">
		<view class="logo" @click="goLogin" :hover-class="!login ? 'logo-hover' : ''">
			<image class="logo-img" :src="login ? avatarUrl : avatar"></image>
			<view class="logo-title">
				<text class="uer-name">Hi，{{login ? uerInfo.nickName : '您未登录'}}</text>
				<text class="go-login navigat-arrow" v-if="!login">&#xe65e;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom" @click="openMyInfo">
				<text class="list-icon">&#xed79;</text>
				<text class="list-text">资料管理</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe604;</text>
				<text class="list-text">个人设置</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item" @click="openChat">
				<text class="list-icon">&#xe611;</text>
				<text class="list-text">机器人聊天</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item" @click="openEventConfig">
				<text class="list-icon">&#xe665;</text>
				<text class="list-text">事件提醒</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
			<view class="center-list-item" @click="openCacheManger">
				<text class="list-icon">&#xe69a;</text>
				<text class="list-text">缓存管理</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item border-bottom">
				<text class="list-icon">&#xe67e;</text>
				<text class="list-text">帮助与反馈</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
		</view>
		<view class="center-list">
			<view class="center-list-item" @click="logout">
				<text class="list-icon">&#xe608;</text>
				<text class="list-text">注销</text>
				<text class="navigat-arrow">&#xe600;</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseUrl} from '../../api/http.js'
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	export default {
		components: {
			avatar
		},
		data() {
			return {
				login: false,
				avatar: '../../static/img/avatar.jpeg',
				uerInfo: {},
				avatarUrl: '',
				imgBg: '../../static/img/bg_01.jpeg'
			}
		},
		onShow() {
			const userInfo = uni.getStorageSync('userInfo'); 
			this.uerInfo = userInfo
			if(userInfo){
				this.login = true
			}
			if(!userInfo.avatar){
				this.avatarUrl = this.avatar
			} else this.avatarUrl = baseUrl + 'app/file/' + userInfo.avatar
		},
		methods: {
			goLogin() {
				if (!this.login) {
					uni.navigateTo({
						url: '../login/login'
					})
				}
			},
			logout(){
				uni.removeStorage({
					key: "token",
					success() {
						uni.navigateTo({
							url: '../login/login'
						})
					}
				})
				uni.removeStorage({
					key: "userInfo",
					success() {
						
					}
				})
			},
			openChat(){
				uni.navigateTo({
					url: '../HM-chat/HM-chat'
				})
			},
			openCacheManger(){
				uni.navigateTo({
					url: 'cacheManager'
				})
			},
			openEventConfig(){
				uni.navigateTo({
					url: 'eventReminder/eventReminder'
				})
			},
			openMyInfo(){
				uni.navigateTo({
					url: 'userInfo'
				})
			}
		}
	}
</script>

<style>
	@font-face {
	  font-family: texticons;
	  font-weight: normal;
	  font-style: normal;
		src: url('https://at.alicdn.com/t/font_2781060_dfdkl9iqz7.woff2?t=1630421226928') format('woff2'),
	        url('https://at.alicdn.com/t/font_2781060_dfdkl9iqz7.woff?t=1630421226928') format('woff'),
	        url('https://at.alicdn.com/t/font_2781060_dfdkl9iqz7.ttf?t=1630421226928') format('truetype');
		}
	
	
	/* @font-face {
		font-family: texticons;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_984210_5cs13ndgqsn.ttf') format('truetype');
	}
 */
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #4cd964;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
		margin-left: 20upx;
	}

	.uer-name {
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login.navigat-arrow {
		font-size: 38upx;
		color: #FFFFFF;
	}

	.login-title {
		height: 150upx;
		align-items: self-start;
		justify-content: center;
		flex-direction: column;
		margin-left: 20upx;
	}

	.center-list {
		background-color: #FFFFFF;
		margin-top: 20upx;
		width: 750upx;
		flex-direction: column;
	}

	.center-list-item {
		height: 90upx;
		width: 750upx;
		box-sizing: border-box;
		flex-direction: row;
		padding: 0upx 20upx;
	}

	.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}

	.list-icon {
		width: 40upx;
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #4cd964;
		text-align: center;
		font-family: texticons;
		margin-right: 20upx;
	}

	.list-text {
		height: 90upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		flex: 1;
		text-align: left;
	}

	.navigat-arrow {
		height: 90upx;
		width: 40upx;
		line-height: 90upx;
		font-size: 34upx;
		color: #555;
		text-align: right;
		font-family: texticons;
	}
</style>