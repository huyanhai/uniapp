<!--
 * @Author: huyanhai
 * @since: 2020-04-19 17:48:04
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 22:39:52
 * @FilePath: /uniapp/pages/index/order.vue
 * @Description: 订单详情
 -->
<template>
	<view class="order-detail-content">
		<view class="order-status">
			<view class="stadus error warning ok">{{orderStatus[item.leaseStatus]}}</view>
			<view class="order-no">订单号：{{item.stringId || ''}}</view>
		</view>
		<view class="detail">
			<view class="item">
				<view class="name">租借费用：</view>
				<view class="info red" v-if="item.totalMoney && item.totalMoney !== 'null' || item.totalMoney === 0">
					{{item.totalMoney}}元
				</view>
				
			</view>
			<view class="item">
				<view class="name">租借时间：</view>
				<view class="info">{{item.leaseStartTime || ''}}</view>
			</view>
			<view class="item btn-20">
				<view class="name">归还时间：</view>
				<view class="info">{{item.leaseFinishTime || ''}}</view>
			</view>
			<view class="item">
				<view class="name">收费标准：</view>
				<view class="info">{{item.price || 0}}元/小时</view>
			</view>
			<view class="item">
				<view class="name">租借押金：</view>
				<view class="info">99元</view>
			</view>
			<view class="item">
				<view class="name">免费时长：</view>
				<view class="info">{{item.freeTime || 0}}分钟</view>
			</view>
			<view class="item btn-20">
				<view class="name">每日封顶：</view>
				<view class="info">{{item.dayMoney || 0}}元</view>
			</view>
			<view class="item">
				<view class="name">租借商家：</view>
				<view class="info">{{item.shopName || ''}}</view>
			</view>
			<view class="item">
				<view class="name">归还商家：</view>
				<view class="info">{{item.returnShopName || ''}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item:{},
				orderStatus:{
					1:"等待弹出",
					2:"租借中",
					3:"租借完成",
					4:"已撤销",
					5:"超时订单",
					6:"扣款失败"
				}
			};
		},
		onLoad(e) {
			console.log(e)
			this.item = JSON.parse(e.item)
		},
	};
</script>

<style lang="scss">
	.order-detail-content {
		height: 100vh;
		.order-status {
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			padding: 0 30rpx;
			height: 104rpx;
			line-height: 104rpx;
			background: #FFFFFF;
			position: relative;

			&::before {
				content: "";
				position: absolute;
				bottom: 1rpx;
				left: 30rpx;
				right: 30rpx;
				background: #E8EAEC;
				height: 1rpx;
				display: block;
			}

			.stadus {
				width: 132rpx;
				height: 44rpx;
				text-align: center;
				line-height: 44rpx;
				border-radius: 44rpx;
				font-size: 24rpx;
				margin-right: 20rpx;
				position: relative;

				&.error {
					background: #FDE1DC;
					color: #F14322;
				}

				&.warning {
					background: #FCEED3;
					color: #F1A921;
				}

				&.ok {
					background: #D3FCF1;
					color: #49F3C1;
				}
			}
		}

		.detail {
			line-height: 60rpx;
			padding: 30rpx;
			background: #FFFFFF;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
			
			.item {
				font-size: 28rpx;
				color: #555555;
				display: flex;
				align-items: center;
				&.btn-20{
					margin-bottom: 20rpx;
				}
				.info {
					color: #777777;

					&.blue {
						color: #22A6F1;
					}

					&.red {
						color: #F14322;
					}
				}
			}
		}
	}
</style>
