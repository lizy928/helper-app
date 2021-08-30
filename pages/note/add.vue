<template>
	<view>
		<jinEdit placeholder="请输入内容" @editOk="editOk" uploadFileUrl="/#"></jinEdit>
	</view>
</template>

<script>
	import jinEdit from '../../components/jin-edit/jin-edit.vue';
	import {
		add
	} from '../../api/note.js'

	export default {
		components: {
			jinEdit
		},
		data() {
			return {

			}
		},
		methods: {
			// 点击发布
			editOk(res) {
				if(!res.text){
					uni.navigateBack({
						
					})
				}
				// res.html res.text res.isPublic
				let data = {}
				data.content = res.html
				data.name = res.text.substring(0,10);
				add(data)
				.then((res) => {
					let newItem = res.data.data;
					let noteList = []
					// 取缓存数据
					try {
					    const value = uni.getStorageSync('note_list');
					    if (value) {
					        noteList = value
					        noteList.push(newItem)
							try {
							    uni.setStorageSync('note_list', noteList);
								uni.navigateBack({
									
								})
							} catch (e) {
							    // error
							}		
					    }
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
