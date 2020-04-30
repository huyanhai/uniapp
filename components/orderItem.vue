<!--
 * @Author: huyanhai
 * @since: 2020-04-19 11:48:57
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 22:43:36
 * @FilePath: /uniapp/components/orderItem.vue
 * @Description: 订单item
 -->
<template>
	<view class="order-item-content" @click="goDetail">
		<view class="top">
			<view class="stadus error warning ok">故障单</view>
			<view class="order-no">订单号：8439348934893</view>
		</view>
		<view class="info">
			<view class="item">
				<text class="name">租借时间：</text>
				<text class="detail">2020/04/10 14:56:00</text>
			</view>
			<view class="item">
				<text class="name">租借商家：</text>
				<text class="detail">金都专业烫染拉名店</text>
			</view>
			<view class="item">
				<text class="name">租借费用：</text>
				<text class="detail num">￥2.00</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: "orderDetail"
				});
			}
		}
	};
</script>

<style lang="scss">
	.order-item-content {
		background: #fff;
		border-radius: 12rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		padding: 30rpx 20rpx;
		.top{
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			.stadus{
				width: 132rpx;
				height: 44rpx;
				text-align: center;
				line-height: 44rpx;
				border-radius: 44rpx;
				font-size: 24rpx;
				margin-right: 20rpx;
				&.error{
					background: #FDE1DC;
					color: #F14322;
				}
				&.warning{
					background: #FCEED3;
					color: #F1A921;
				}
				&.ok{
					background: #D3FCF1;
					color: #49F3C1;
				}
			}
		}
		.info{
			line-height: 50rpx;
			margin-top: 20rpx;
			.name{
				font-size: 28rpx;
				color: #555555;
			}
			.detail{
				font-size: 28rpx;
				color: #999999;
				&.num{
					color: #F14322;
				}
			}
			
		}
	}
</style>
