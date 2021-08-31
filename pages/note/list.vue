<template>
	<view>
		<mark-slide-list :list="noteList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod">
		</mark-slide-list>
		<!-- <add-symbol @floatTapEvent="floatTapEvent"></add-symbol> -->
		<uni-fab ref="fab" :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
		 @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
	import markSlideList from '../../components/mark-slide-list/mark-slide-list.vue'
	import addSymbol from '../../components/ls-float.vue'
	import {
		list,
		del,
		add,
		update
	} from '../../api/note'
	export default {
		components: {
			markSlideList,
			addSymbol
		},
		data() {
			return {
				noteList: [
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
				],
				
				// 悬浮菜单控制
				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
				},
				content: [{
						iconPath: '/static/img/icon/add_unactive.png',
						selectedIconPath: '/static/img/icon/add_active.png',
						text: '新增',
						active: false
					},
					{
						iconPath: '/static/img/icon/synchronize_unactive.png',
						selectedIconPath: '/static/img/icon/synchronize_active.png',
						text: '同步',
						active: false
					}
				]
			}
		},
		onLoad() {
			this.listData()
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods: {
			changeMethod(data, button, index) {
				if ("删除" === button.title) {
					// 删除
					this.delete(data.id)
				}
			},
			clickMethod(data) {
				debugger
				console.log('点击行回调', data)
				uni.navigateTo({
					url: 'edit?index=' + data.index
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
							item.index = index
							dataList.push(item)
							that.noteList = dataList
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
				this.noteList = []
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
								item.index = index
				        		dataList.push(item)
				        		that.noteList = dataList
				        	}
				        })
				    }
				} catch (e) {
				    // error
				}			
			},
			delete(id) {
				let that = this
				del(id)
				.then((res) => {
					that.listData()
				})
				.catch((error) => {

				})
			},
			synchronizeData(){
				try {
					debugger
				    const value = uni.getStorageSync('note_list');
				    if (value) {
						uni.showLoading({
						    title: '加载中'
						});
				        value.forEach(function(item, row, index){
							if(item.id){
								//更新
								update(item, item.id)
								.then((res)=>{})
								.catch(()=>{})
							} else {
								//新增
								add(item)
								.then((res)=>{})
								.catch(()=>{})
							}
						})
						uni.hideLoading();
				    } else {
						that.freshList()()
					}
				} catch (e) {
				    // error
				}
			},
			trigger(e) {
				let that = this
				that.content[e.index].active = !e.item.active
				setTimeout(function(){
					that.content[e.index].active = !e.item.active
				}, 1000);
				if(e.index === 0){
					uni.navigateTo({
						url: 'add'
					})
				}
				//同步
				if(e.index === 1){
					uni.showModal({
						title: '提示',
						content: `确定同步数据到云端吗？`,
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定')
								//开始同步数据
								that.synchronizeData()
							} else if (res.cancel) {
								console.log('用户点击取消')
							}
						}
					})
				}
			},
			fabClick() {
				// uni.showToast({
				// 	title: '点击了悬浮按钮',
				// 	icon: 'none'
				// })
			},
			switchBtn(hor, ver) {
				if (hor === 0) {
					this.direction = this.direction === 'horizontal' ? 'vertical' : 'horizontal'
					this.directionStr = this.direction === 'horizontal' ? '垂直' : '水平'
				} else {
					this.horizontal = hor
					this.vertical = ver
				}
				this.$forceUpdate()
			}
		}
	}
</script>

<style>

</style>
