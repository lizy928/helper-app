<template>
	<view class="evan-form-show">
		<evan-form :hide-required-asterisk="hideRequiredAsterisk" ref="form" :model="info">
			<evan-form-item label="名称：" prop="name">
				<input class="form-input" placeholder-class="form-input-placeholder" v-model="info.name"
					placeholder="请输入名称" />
			</evan-form-item>
			<evan-form-item label="简介：" prop="desc" label-position="top">
				<textarea class="form-input textarea" placeholder-class="form-input-placeholder" v-model="info.desc"
					placeholder="请输入简介(10-30个字)" />
			</evan-form-item>
		</evan-form>
		<button @click="save" class="evan-form-show__button">保存</button>
	</view>
</template>

<script>
	import utils from '@/components/evan-form/utils.js'
	import {add, list, del, update}  from '../../api/signIn.js'
	export default {
		data() {
			return {
				// 表单的内容必须初始化
				info: {
					name: '',
					desc: '',
				},
				rules: {
					name: {
						required: true,
						message: '请输入名称'
					},
					desc: [{
							required: true,
							message: '请输入简介'
						},
						{
							min: 10,
							max: 30,
							message: '简介必须在10到30个字之间'
						}
					],
				},
			}
		},
		mounted() {
			// 这里必须放在mounted中，不然h5，支付宝小程序等会找不到this.$refs.form
			this.$refs.form.setRules(this.rules)
		},
		methods: {
			save() {
				let data = {}
				data.name = this.info.name
				data.desc = this.info.desc
				this.$refs.form.validate((res) => {
					if (res) {
						add(data)
						.then((res)=>{
							if(res.data.code === 200){
								uni.switchTab({
									url: './list'
								})
							} else {
								uni.showToast({
									title: res.data.message
								})
							}
						})
						.catch((error)=>{
							
						})
					}
				})
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
