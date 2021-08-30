<template>
	<view class="evan-form-show">
		<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="form" :model="info">
			<evan-form-item label="事件名称：" prop="name">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="info.name"
					placeholder="请输入事件名称" />
			</evan-form-item>
			<evan-form-item prop="sex">
				<template slot="formItem">
					<view class="customize-form-item">
						<view class="customize-form-item__label">时间类型：</view>
						<radio-group @change="timeTypeChange">
							<label class="customize-form-item__radio" v-for="item in timeType" :key="item.value">
								<view>
									<radio :value="item.value" :checked="item.value === info.timeType" />
								</view>
								<view class="customize-form-item__radio__text">{{item.name}}</view>
							</label>
						</radio-group>
					</view>
				</template>
			</evan-form-item>
			<evan-form-item label="重复提醒：" prop="name">
				<switch checked v-model="info.repeat" @change="repeatChange" />
			</evan-form-item>
			<evan-form-item label="日期" prop="name">
				<view>
					<button type="default" @click="openDatetimePicker">选择日期</button>
					<input disabled="disabled" @click="openDatetimePicker" v-model="birthday"></input>
					<SimpleDateTimePicker ref="myPicker" @submit="handleSubmit" :start-year="2000" :end-year="2030" />
				</view>
			</evan-form-item>
		</evan-form>
		<button @click="save" class="evan-form-show__button">保存</button>
	</view>
</template>

<script>
	import SimpleDateTimePicker from "uni_modules/buuug7-simple-datetime-picker/components/buuug7-simple-datetime-picker/buuug7-simple-datetime-picker.vue";

	import {
		add
	} from '../../../api/eventReminder'

	export default {
		components: {
			SimpleDateTimePicker,
		},
		data() {
			return {
				timeType: [{
						name: '阳历',
						value: '0'
					},
					{
						name: '农历',
						value: '1'
					}
				],
				hideRequiredAsterisk: false,
				info: {
					name: '',
					repeat: true,
					timeType: 0
				},
				birthday: "",
				rules: {
					name: {
						required: true,
						message: '请输入姓名'
					},
					repeat: {
						required: true,
						message: '请选择是否重复'
					},
					timeType: {
						required: true,
						message: '请选择时间类型'
					},
				}
			}
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			save() {
				let that = this
				if(this.birthday == ''){
					uni.showToast({
						title:"请选择时间"
					})
					return;
				}
				that.$refs.form.validate((res) => {
					if (res) {
						//保存数据
						let data = {}
						data.name = that.info.name
						data.repeat = that.info.repeat
						data.timeType = parseInt(that.info.timeType)
						data.time = that.birthday
						add(data)
							.then((res) => {
								if (res.data.code === 200) {
									uni.navigateBack({

									})
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
				})
			},
			repeatChange: function(e) {
				console.log('switch2 发生 change 事件，携带值为', e.target.value)
				this.info.repeat = e.target.value
			},
			// 打开picker
			openDatetimePicker() {
				this.$refs.myPicker.show();
			},

			// 关闭picker
			closeDatetimePicker() {
				this.$refs.myPicker.hide();
			},
			timeTypeChange(e) {
				this.info.timeType = e.detail.value
			},
			handleSubmit(e) {
				// {year: "2019", month: "07", day: "17", hour: "15", minute: "21"}
				console.log(e);
				this.birthday = `${e.year}-${e.month}-${e.day} ${e.hour}:${e.minute}`;
			},
		}
	}
</script>

<style lang="scss">
	.evan-form-show {
		padding: 0 30rpx;
		background-color: #fff;

		.form-input {
			font-size: 28rpx;
			color: #333;
			text-align: right;
			width: 100%;
			box-sizing: border-box;
			height: 60rpx;

			&.textarea {
				height: 240rpx;
				padding: 24rpx 0;
				text-align: left;
			}
		}

		.form-input-placeholder {
			font-size: 28rpx;
			color: #999;
		}

		&__button {
			width: 100%;
			height: 88rpx;
			border-radius: 8rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0;
			font-size: 36rpx;
			color: #fff;
			margin-top: 20rpx;
			background-color: #2D87D5;

			&::before,
			&::after {
				border: none;
			}
		}

		.customize-form-item {
			&__label {
				font-size: 28rpx;
				color: #333;
				margin-bottom: 16rpx;
			}

			&__radio {
				display: flex;
				align-items: center;
				margin-bottom: 16rpx;

				&__text {
					font-size: 28rpx;
					color: #333;
				}
			}
		}
	}
</style>
