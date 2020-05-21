<!--
 * @Author: huyanhai
 * @since: 2020-04-19 20:32:49
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 21:10:45
 * @FilePath: /uniapp/pages/index/loanSuccess.vue
 * @Description: 免押租借成功
 -->
<template>
	<view class="loan-success-content">
		<image class="studus-img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-zjsuccess.png"></image>
		<text class="tips">充电宝弹出失败</text>
		<text class="info">如使用上有疑问，请联系客服</text>
		<view class="back-home" @click="goHome">返回首页</view>
		<view class="call" @click="call">联系客服</view>
	</view>
</template>

<script>
	export default {
		methods:{
			goHome(){
				uni.reLaunch({
				    url: 'index'
				});
			},
			call(){
				uni.makePhoneCall({
				  phoneNumber: "4008123277" //仅为示例
				});
			}
		}
	};
</script>

<style lang="scss">
	.loan-success-content{
		padding: 30rpx;
		box-sizing: border-box;
		.studus-img{
			width: 428rpx;
			height: 364rpx;
			margin: 60rpx auto 40rpx auto;
			display: block;
		}
		.tips{
			font-size: 28rpx;
			color: #333333;
			text-align: center;
			display: block;
		}
		.info{
			font-size: 26rpx;
			color: #999999;
			text-align: center;
			display: block;
			margin: 30rpx 0 250rpx 0;
			.num{
				color: #22A6F1;
			}
		}
		.back-home{
			height: 90rpx;
			margin: 70rpx 0 0 0;
			background: #22A6F1;
			color: #FFFFFF;
			border-radius: 90rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
		.call{
			height: 90rpx;
			margin: 40rpx 0 0 0;
			color: #22A6F1;
			border:2rpx solid #22A6F1;
			border-radius: 90rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		}
	}
</style>
