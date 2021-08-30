<template>
	<view>
		<button @click="cleanChatCache">清理聊天缓存</button>
		<button @click="cleanNoteCache">清理笔记缓存</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			cleanChatCache(){
				try {
				    uni.removeStorageSync('robot_chat');
					uni.showToast({
						icon: "success",
						title: "清理成功！",
						duration: 2000
					})
				} catch (e) {
				    // error
				}
			},
			cleanNoteCache(){
				try {
				    uni.removeStorageSync('note_list');
					uni.showToast({
						icon: "success",
						title: "清理成功！",
						duration: 2000
					})
				} catch (e) {
				    // error
				}
			}
		}
	}
</script>

<style>

</style>
