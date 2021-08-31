<template>
	<view>
		<jinEdit :html="content" placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit>
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import {dateFtt} from '../../utils/DateUtil.js'
	import {
		update
	} from '../../api/note'
	export default {
		components: {
			jinEdit
		},
		data() {
			return {
				index: '',
				content: '',
			}
		},
		onLoad(option) {
			this.index = option.index
			this.initData()
		},
		methods: {
			// 点击发布
			editOk(res) {
				let that = this
				let dataList = []
				let data = {}
				data.name = res.text.substring(0, 10)
				data.content = res.html
				data.updateTime = dateFtt("yyyy-MM-dd hh:mm:ss", new Date())
				try {
					const value = uni.getStorageSync('note_list');
					if (value) {
						dataList.push(data)
						value.forEach(function(value, index, arr) {
							if (index !== that.index) {
								dataList.push(value)
							}
						})
						try {
							uni.setStorageSync('note_list', dataList);
							uni.navigateBack({
								
							})
						} catch (e) {
							// error
						}
					}
				} catch (e) {
					// error
				}
			},
			initData() {
				let that = this
				try {
					const value = uni.getStorageSync('note_list');
					if (value) {
						value.forEach(function(value, index, arr) {
							if (index == that.index) {
								that.content = value.content
							}
						})
					}
				} catch (e) {

				}
			}
		},
	}
</script>

<style>

</style>
