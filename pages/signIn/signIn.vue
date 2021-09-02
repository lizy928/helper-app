<template>
	<view>
		<model-calendar :sendYear="toYear" :sendMonth="toMonth" :dataSource="signData" :totalNum="sumCount"
			@dateChange="getData" @clickChange="clickSign">
		</model-calendar>
		<view class='count'>
			<view>
				<text>今日</text>
				<text style="font-size: large; color: #0eff6e;" v-if="todaySignIn">已</text>
				<text style="font-size: large; color: #FF5A5F;" v-if="!todaySignIn">未</text>
				<text>签到</text>
			</view>
			<text>截至目前，已坚持打卡</text>
			<view class='daynumber'>
				<text class='number'>{{totalCount}}</text>
				<text class='day'>天</text>
			</view>
			<view>本月累积打卡<text class="monthSum">{{monthCount}}</text>天</view>
			<text>请再接再厉，继续努力!</text>
		</view>
	</view>
</template>

<script>
	import modelCalendar from '@/components/Calendar.vue';
	
	import {getRecordDetail, addRecord} from '../../api/signIn.js'
	export default {
		data() {
			return {
				toYear: parseInt(new Date().getFullYear()), //本日
				toMonth: parseInt(new Date().getMonth() + 1), //本月
				totalCount: 0,
				signData: [],
				singInId: '',
				monthCount: 0,
				todaySignIn: false
			};
		},
		components: {
			modelCalendar
		},
		onLoad(option) {
			this.singInId = option.id
			//获取当前用户当前任务的签到状态
			this.getData(this.toYear + "-" + this.toMonth);
		},
		created() {
		},
		methods: {
			clickSign(day) {
				let that = this
				var params = {}
				params.signInId = this.singInId
				params.signInTime = day
				params.remark = "123"
				addRecord(params)
				.then((res)=>{
					if(res.data.code === 200){
						uni.showToast({
							icon: "success",
							title: "签到成功",
							duration: 2000
						})
						that.signData.push(day);
						that.sumCount++
						that.totalCount ++ 
					} else {
						uni.showToast({
							title: res.data.message,
							duration: 2000
						})
					}
					
				})
				.catch((error)=>{
					
				})
				
			},
			//当模板的时候可以直接引入，然后触发子组件事件到父界面去控制数据

			//获取当前用户该任务的签到数组
			getData(val) {
				let that = this
				let dateList = []
				let signId = that.singInId;
				let params = {}
				params.date = val
				getRecordDetail(that.singInId, params)
				.then((res) => {
					that.totalCount = res.data.data.totalCount
					that.monthCount = res.data.data.monthCount
					that.todaySignIn = res.data.data.todaySignIn
					let recordList = res.data.data.recordList
					recordList.forEach(function(value, row, index) {
						dateList.push(value.signInTime)
					})
					that.signData = dateList
					that.onJudgeSign();
				})
				.catch((error) => {
			
				})
			},
			signIn(date, type) {
				var params = {}
				console.log(params)
				params.signInId = this.singInId
				params.type = type
				params.signInTime = this.cur_year + "-" + this.cur_month + '-' + date
				params.remark = "123"
				addRecord(params)
					.then((res) => {
						if(res.data.code === 200){
							uni.showToast({
								title: str + "成功" + date + "号",
								icon: 'success',
								duration: 2000
							});
							//refresh
							this.onJudgeSign();
						} else {
							uni.showToast({
								icon: "error",
								title: res.data.message
							})
						}
					})
					.catch((error) => {

					})
			}
		}
	}
</script>

<style lang='scss'>
	.count .daynumber {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.count .daynumber .day {
		margin-top: 50rpx;
	}

	.count {
		margin: 10rpx;
		padding: 20rpx;
		display: flex;
		text-align: center;
		border-radius: 10px;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		align-items: center;
	}

	.count .number {
		color: #fff;
		font-size: 60rpx;
		background-color: #94db98;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 20rpx;
	}

	.monthSum {
		color: red;
		font-size: 40rpx;
	}

	.count text {
		margin: 10rpx;
	}
</style>
