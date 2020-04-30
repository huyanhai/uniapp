<template>
	<view class="about-us-content">
		<view class="lists">
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
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		
		.list{
			display: flex;
			justify-content: space-between;
			border-bottom: 2rpx solid #E8EAEC;
			align-items: center;
			padding: 20rpx 0;
			&:last-child{
				border-bottom: 0;
			}
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
				.add{
					color: #F1A921;
				}
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
