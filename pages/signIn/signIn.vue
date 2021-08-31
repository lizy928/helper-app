<template>
	<view>
		<model-calendar :sendYear="toYear" :sendMonth="toMonth" :dataSource="signData" :totalNum="sumCount"
			@dateChange="getData" @clickChange="clickSign">
		</model-calendar>
		<view class='count'>
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
				monthCount: 0
			};
		},
		components: {
			modelCalendar
		},
		onLoad(option) {
			this.singInId = option.id
		},
		created() {
			//获取当前用户当前任务的签到状态  			
			this.getData(this.toYear + "-" + this.toMonth);
		},
		methods: {
			clickSign(day) {
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
						this.signData.push(day);
						this.sumCount++
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
				let dateList = []
				getRecordDetail(this.singInId)
				.then((res) => {
					this.sumCount = res.data.data.length
					let list = res.data.data
					list.forEach(function(value, row, index) {
						dateList.push(value.signInTime)
					})
				})
				.catch((error) => {
			
				})
				this.signData = dateList
			},

			getRecord() {
				let that = this
				getRecordDetail(that.singInId)
					.then((res) => {
						this.totalCount = res.data.data.totalCount
						this.monthCount = res.data.data.monthCount
						let list = res.data.data.recordList
						list.forEach(function(value, row, index) {
							that.SignUp.push(value.signInTime)
						})
					})
					.catch((error) => {

					})
				console.log(that.SignUp.length)
				this.onJudgeSign();
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
						uni.showToast({
							title: str + "成功" + date + "号",
							icon: 'success',
							duration: 2000
						});
						//refresh
						this.onJudgeSign();
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
		margin: 20rpx;
		padding: 30rpx;
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
