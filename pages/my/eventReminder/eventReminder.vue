<template>
	<view>
		<uni-swipe-action>
			<!-- 基础用法 -->
			<uni-swipe-action-item  :right-options="options" @click="onClick($event, item)" @change="change" v-for="(item,index) in dataList" :key="index" :data-index="index">
				<view class="border-bottom">
					<view>
						<text>《 {{item.name}} 》</text>
						<text>倒计时：</text>
					</view>
					<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="item.day"
						:hour="item.hour" :minute="item.minute" :second="item.second">
					</uni-countdown>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<add-symbol @floatTapEvent="floatTapEvent"></add-symbol>
		
		<!-- 背景图片 --> 
		<image class="image-bg" src="../../../static/img/bg_01.jpeg"/>
	</view>
</template>

<script>
	import addSymbol from '../../../components/ls-float.vue'
	import {
		list,
		del
	} from '../../../api/eventReminder'
	export default {
		components: {
			addSymbol
		},
		data() {
			return {
				gutter: 0,
				nvueWidth: 730,
				dataList: [],
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			}
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.listData()
			//this.getWindowSize();
			uni.stopPullDownRefresh()
		},
		onLoad() {
			this.listData()
		},
		methods: {
			floatTapEvent() {
				console.log("add symboil")
				uni.navigateTo({
					url: 'add'
				})
			},
			listData() {
				let that = this
				list({})
					.then((res) => {
						that.dataList = res.data.data
					})
					.catch(() => {

					})
			},
			delete(id) {
				let that = this
				del(id)
					.then((res) => {
						if (res.data.code === 200) {
							that.listData()
						}
					})
					.catch((error) => {

					})
			},
			onClick(e, item) {
				debugger
				if(e.content.text === '删除'){
					this.delete(item.id)
				}
				console.log('点击了' + (e.position === 'left' ? '左侧' : '右侧') + e.content.text + '按钮')
			},
			swipeChange(e, index) {
				console.log('当前状态：' + e + '，下标：' + index)
			},
			change(e){
				console.log(e)
			}

		}
	}
</script>

<style lang="scss" scoped>	

.image-bg {
    position: absolute;
    z-index: -1;
    left: 0;
    right: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
}

.border-bottom {
		border-bottom-width: 1upx;
		border-color: #c8c7cc;
		border-bottom-style: solid;
	}
</style>
