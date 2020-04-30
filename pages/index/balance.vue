<template>
	<view class="balance-content">
		<image class="balance-icon" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-qb.png"/>
		<view class="label">账户余额</view>
		<view class="money">￥99.00</view>
		<view class="operation">
			<view class="recharge" @click="goRecharge">充值</view>
			<view class="reflect" @click="goReflect">提现</view>
		</view>
		<text class="history" @click="goHistory">提现记录 >></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			goReflect(){
				uni.navigateTo({
				  url: "reflect"
				});
			},
			goRecharge(){
				uni.navigateTo({
				  url: "recharge"
				});
			},
			goHistory(){
				uni.navigateTo({
				  url: "history"
				});
			}
		}
	}
</script>

<style lang="scss">
.balance-content{
	height: 100vh;
	.balance-icon{
		width: 148rpx;
		height: 148rpx;
		margin: 70rpx auto 0 auto;
		display: block;
	}
	.label{
		font-size: 28rpx;
		color: #333333;
		width: 100%;
		text-align: center;
	}
	.money{
		font-size: 50rpx;
		color: #333333;
		text-align: center;
	}
	.operation{
		margin: 100rpx 30rpx 0 30rpx;
		.recharge{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			border-radius: 90rpx;
			background: #22A6F1;
			font-size: 30rpx;
			color: #FFFFFF;
		}
		.reflect{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			border-radius: 90rpx;
			color: #22A6F1;
			font-size: 30rpx;
			border: 2rpx solid #22A6F1;
			margin-top: 40rpx;
		}
	}
	.history{
		position: absolute;
		bottom: 120rpx;
		text-align: center;
		font-size: 28rpx;
		color: #22A6F1;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
