<template>
	<view class="about-us-content">
		<view class="lists">
			<view class="list">
				<text class="name">客服热线</text>
				<text class="value">4008123277</text>
			</view>
			<view class="list">
				<text class="name">商户合作微信</text>
				<text class="value">we12333</text>
			</view>
			<view class="list">
				<text class="name">公司官网</text>
				<text class="value">http://www.womry.com/</text>
			</view>
		</view>
		<text class="copyright">
			当前版本2.0.3 \n Copyright@2019 起电租电
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
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 0 30rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		
		.list{
			display: flex;
			justify-content: space-between;
			height: 90rpx;
			border-bottom: 2rpx solid #E8EAEC;
			line-height: 90rpx;
			&:last-child{
				border-bottom: 0;
			}
			.name{
				font-size: 28rpx;
				color: #333333;
			}
			.value{
				font-size: 28rpx;
				color: #666666;
			}
		}
	}
	.copyright{
		position: absolute;
		bottom: 40rpx;
		text-align: center;
		font-size: 26rpx;
		color: #999999;
		width: 100%;
	}
}
</style>
