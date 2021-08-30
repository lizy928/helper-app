<template>
	<view>
		<view v-for="(item,index) in dataList" :key="index" :data-index="index">
			<label>{{item.name}}</label>
			<uni-countdown color="#FFFFFF" background-color="#00B26A" border-color="#00B26A" :day="item.day"
				:hour="item.hour" :minute="item.minute" :second="item.second">
			</uni-countdown>
			
		</view>
		<add-symbol @floatTapEvent="floatTapEvent"></add-symbol>
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
				debugger
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

		}
	}
</script>

<style lang="scss" scoped>

</style>
