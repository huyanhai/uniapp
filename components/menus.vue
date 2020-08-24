<template>
	<view class="menus" :style="{marginTop:statusBarHeight+'px'}">
		<view class="back" @click="goBack">
			<image class="img"  src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/back.png"></image>
		</view>
		<view class="navbar" v-if="title">{{title}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				"statusBarHeight": wx.getSystemInfoSync()['statusBarHeight'],
			};
		},
		props:{
			title:{
				type:String,
				default:'页面标题'
			}
		},
		methods:{
			goBack(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.menus{
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;
	height: 98rpx;
	.back{
		position: absolute;
		left: 0;
		z-index: 100;
		width: 100rpx;
		display: flex;
		align-items: center;
		.img{
			width: 21rpx;
			height: 36rpx;
			margin-left: 40rpx;
		}
	}
	.navbar{
		height: 98rpx;
		line-height: 98rpx;
		position: relative;
		z-index: 10;
		text-align: center;
		font-size: 32rpx;
		color: #FFFFFF;
	}
}
</style>
