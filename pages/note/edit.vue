<template>
	<view>
		<jinEdit :html="content" placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit>
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import {
		update
	} from '../../api/note'
	export default {
		components: {
			jinEdit
		},
		data() {
			return {
				id: '',
				content: '',
			}
		},
		onLoad(option) {
			this.id = option.id
			this.initData()
		},
		methods: {
			// 点击发布
			editOk(res) {
				let that = this
				let dataList = []
				let data = {}
				data.name = res.text.substring(0, 5)
				data.content = res.html
				data.updateTime = new Date()
				try {
					const value = uni.getStorageSync('note_list');
					if (value) {
						dataList.push(data)
						value.forEach(function(value, index, arr) {
							if (value.id != that.id) {
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
							if (value.id == that.id) {
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
