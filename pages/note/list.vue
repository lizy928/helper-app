<template>
	<view>
		<mark-slide-list :list="list" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod">
		</mark-slide-list>
		<add-symbol @floatTapEvent="floatTapEvent"></add-symbol>
	</view>
</template>

<script>
	import markSlideList from '../../components/mark-slide-list/mark-slide-list.vue'
	import addSymbol from '../../components/ls-float.vue'
	import {
		list,
		del,
		add
	} from '../../api/note'
	export default {
		components: {
			markSlideList,
			addSymbol
		},
		data() {
			return {
				list: [
					// {
					// 	id: 1,
					// 	title: '张三',
					// 	rightDetail: '2019-03-18',
					// 	detail: 'XXXXXXXXXXXXXXXXXXX公司',
					// 	slide_x: 0
					// }
				],
				buttonList: [{
						title: '分享',
						background: '#c4c7cd'
					},
					{
						title: '删除',
						background: '#ff3b32'
					}
				]
			}
		},
		onShow() {
			this.listData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.freshList()
		},
		methods: {
			changeMethod(data, button, index) {
				console.log('滑动按钮回调', data)
				console.log('滑动按钮回调', button)
				if ("删除" === button.title) {
					// 删除
					this.delete(data.id)
				}
			},
			clickMethod(data) {
				console.log('点击行回调', data)
				uni.navigateTo({
					url: 'edit?id=' + data.id
				})
			},
			floatTapEvent() {
				console.log("add symboil.....")
				uni.navigateTo({
					url: './add'
				})
			},
			freshList() {
				let that = this
				list({})
					.then((res) => {
						let dataList = []
						res.data.data.forEach(function(value, index, arr) {
							let item = {}
							item.id = value.id
							item.title = value.name.substring(0, 5);
							item.detail = value.name
							item.rightDetail = value.createTime ? value.createTime : value.updateTime
							item.slide_x = 0
							dataList.push(item)
							that.list = dataList
						})
						uni.setStorage({
							key: 'note_list',
							data: res.data.data,
							success: function() {
								console.log('success');
							}
						});

						//停止刷新
						uni.stopPullDownRefresh()
					})
					.catch((error) => {

					})
			},
			listData() {
				let that = this
				let dataList = []
				
				try {
				    const value = uni.getStorageSync('note_list');
				    if (value) {
				        value.forEach(function(value, index, arr) {
				        	if (value) {
				        		let item = {}
				        		item.id = value.id
				        		item.title = value.name.substring(0, 5);
				        		item.detail = value.name
				        		item.rightDetail = value.createTime ? value.createTime : value
				        			.updateTime
				        		item.slide_x = 0
				        		dataList.push(item)
				        		that.list = dataList
				        	}
				        })
				    }
				} catch (e) {
				    // error
				}			
			},
			delete(id) {
				let that = this
				let dataList = []
				let storeList = []
				del(id)
				.then((res) => {
					try {
					    const value = uni.getStorageSync('note_list');
					    if (value) {
					        value.forEach(function(value, index, arr) {
					        	if(id !== value.id){
					        		let item = {}
					        		item.id = value.id
					        		item.title = value.name.substring(0, 5);
					        		item.detail = value.name
					        		item.rightDetail = value.createTime ? value.createTime : value
					        			.updateTime
					        		item.slide_x = 0
					        		dataList.push(item)
					        		storeList.push(value)
					        	}
					        })
					    }
						try {
						    uni.setStorageSync('note_list', storeList);
						} catch (e) {
						    // error
						}
						that.list = dataList
					} catch (e) {
					    // error
					}
				})
				.catch((error) => {

				})
			}
		}
	}
</script>

<style>

</style>
