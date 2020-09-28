<template>
	<view class="for-alipay">
		<view class="tips">
			<view class="big">此设备仅支付宝平台使用</view>
			<text class="small">请打开支付宝App扫码租借</text>
		</view>
		<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/foralipay.png" mode="" class="img"></image>
		<!-- #ifdef MP-WEIXIN -->
		<view class="adContainer">
			<ad unit-id="adunit-b8c7a5f8556ce3fa"></ad>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
.for-alipay{
	height: 100vh;
	display: flex;
	flex-direction: column;
	align-items: center;
	.img{
		width: 453rpx;
		height: 401rpx;
		margin: 0 auto;
	}
	.tips{
		margin-top: 200rpx;
		text-align: center;
		.big{
			font-size: 32rpx;
			color: #333333;
		}
		.small{
			font-size: 20rpx;
			color: #999999;
		}
	}
	.adContainer{
		width: 100%;
		position: fixed;
		bottom: 0;
		left: 0;
	}
}
</style>
