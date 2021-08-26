<template>
	<view class="tab">
		<navigator open-type="switchTab" url="/pages/index/index" class="tab-box">
			首页
		</navigator>
		<navigator open-type="switchTab" url="/pages/calendar/calendar" class="tab-box">
			打卡
		</navigator>
		<navigator open-type="switchTab" url="/pages/my/my" class="tab-box">
			日记
		</navigator>
		<navigator open-type="switchTab" url="/pages/my/my" class="tab-box">
			我的
		</navigator>
	</view>
	
</template>

<script>
	export default {
		name:"tab",
		data() {
			return {
				
			};
		}
	}
</script>

<style>
.tab{
	height: 50px;
	width: 100%;
	position: fixed;
	bottom: 0;
	left: 0;
}
.tab-box{
	float: left;
	width: 25%;
	color: #FFFFFF;
	background: #000000;
	text-align: center;
	height: 50px;
	line-height: 50px;
	font-size: 20px;
}
</style>
