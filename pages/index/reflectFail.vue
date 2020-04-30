<template>
	<view class="reflect-success-content">
		<image class="stadus" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-txsb.png"></image>
		<view class="tips">提现失败</view>
		<view class="done" @click="goHome">返回首页</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goHome(){
				uni.redirectTo({
					url:"index"
				})
			}
		}
	}
</script>

<style lang="scss">
.reflect-success-content{
	.stadus{
		width: 120rpx;
		height: 120rpx;
		margin: 145rpx auto 22rpx auto;
		display: block;
	}
	.tips{
		font-size: 30rpx;
		color: #333333;
		text-align: center;
		width: 100%;
		margin-bottom: 10rpx;
	}
	.info{
		color: #999999;
		font-size: 26rpx;
		width: 100%;
		text-align: center;
	}
	.done{
		margin: 110rpx 30rpx 0 30rpx;
		height: 90rpx;
		line-height: 90rpx;
		text-align: center;
		border-radius: 90rpx;
		background: #22A6F1;
		font-size: 30rpx;
		color: #FFFFFF;
	}
}
</style>
