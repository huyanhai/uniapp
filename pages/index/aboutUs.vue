<template>
	<view class="about-us-content">
		<view class="lists">
			<image class="logo" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/logo.png"></image>
			<text class="text">起电宝V1.2.0</text>
		</view>
		<text class="copyright">
			<!-- <text class="text">服务协议</text>|<text class="text">隐私申明</text> \n -->
			版权所有 2011-2020 重庆淘电科技有限公司
		</text>
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
.about-us-content{
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	.lists{
		width: 200rpx;
		height: 200rpx;
		margin: 100rpx auto 0 auto;
		text-align: center;
		.logo{
			background: #FFFFFF;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
			width: 100%;
			height: 100%;
			border-radius: 10rpx;
		}
		.text{
			font-size: 32rpx;
			color: #666666;
		}
	}
	.copyright{
		position: absolute;
		bottom: 40rpx;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
		width: 100%;
		.text{
			margin: 0 10rpx;
		}
	}
}
</style>
