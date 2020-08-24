<template>
	<view class="about-us-content">
		<view class="lists">
			<view class="title">交易明细</view>
			<view class="list">
				<view class="l">
					<text class="order-no">单号：232008387499</text>
					<text class="type">充值押金</text>
					<text class="time">2020/04/10  14:56:00</text>
				</view>
				<text class="r add">
					+99.00
				</text>
			</view>
			<view class="list">
				<view class="l">
					<text class="order-no">单号：232008387499</text>
					<text class="type">充值押金</text>
					<text class="time">2020/04/10  14:56:00</text>
				</view>
				<text class="r">
					-99.00
				</text>
			</view>
		</view>
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
		.title{
			font-size: 32rpx;
			color: #333333;
			height: 100rpx;
			line-height: 100rpx;
		}
		.list{
			display: flex;
			justify-content: space-between;
			top: 2rpx solid #E8EAEC;
			align-items: center;
			padding: 20rpx 0;
			border-top: 2rpx solid #F2F2F2;
			.l{
				display: flex;
				flex-direction: column;
				line-height: 50rpx;
				.order-no,.type{
					font-size: 28rpx;
					color: #333333;
				}
				.time{
					font-size: 28rpx;
					color: #999999;
				}
				
			}
			.r{
				font-size: 28rpx;
				color: #333333;
				font-weight: bold;
				&.add{
					color: #FFC600;
				}
			}
		}
	}
}
</style>
