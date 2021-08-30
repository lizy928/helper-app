<template>
	<view style="background-image: url(../../static/img/comment_bg.png);">
		<uni-list v-for="(item,index) in commentList" :key="index" :data-index="index">
			<uni-list-item :title="item.name" :note="item.content"></uni-list-item>
		</uni-list>

	</view>
</template>

<script>
	import {listComment} from '../../api/index'
	export default {
		components: {

		},
		data() {
			return {
				commentList: [],
				demoList: [{
						username: '——网易云音乐热评《HalseyChina》',
						name: ' ——网易云音乐热评《该》',
						content: '你是经历了多少委屈，才有了那一身好脾气。',
						color: '#aaff00'
					},
					{
						username: '——网易云音乐热评《该飞雪卿舞"',
						name: '你问我为何沉默，有的人无话可说，有的话无人可说',
						content: '你问我为何沉默，有的人无话可说，有的话无人可说',
						color: '#aaff00'
					},
					{
						username: 'HalseyChina',
						name: ' ——网易云音乐热评《Without Me》',
						content: 'when the events that inspired Without Me went down, this artist helped me through it all. now that the song is #1 this only seemed fitting to release... thanks JuiceWrld 💚”——Halsey',
						color: '#aa1'
					},
					{
						username: '飞雪卿舞"',
						name: '——网易云音乐热评《该拜月而梦》',
						content: '你是人间烟波，你是好景虚设，你弹尽人间声色，引我追月而来，遍寻不得。你是人间梦寻，你是好景怅惘，你留下斑点痕迹，引我向月而拜，犹梦千转',
						color: '#aaff00'
					}
				]
			}
		},
		onLoad() {
			this.listData()
		},
		methods: {
			listData(){
				debugger
				let that = this
				listComment({})
				.then((res)=>{
					if(res.data.code === 200){
						if(res.data.data.length !== 0){
							let list = []
							res.data.data.forEach(function(value){
								let name = '——网易云音乐热评《' + value.name + '》'
								let content = value.content + '————' + value.username 
								value.name = name
								value.content = content
								list.push(value)
							})
							that.commentList = list
						} else{
							that.commentList = that.demoList
						}
					}
				})
				.catch((res)=>{})
			}
		}
	}
</script>

<style lang="scss">

</style>
