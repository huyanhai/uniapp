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
			<view class="stadus error warning ok">{{orderStatus[item.leaseStatus] || "暂无状态"}}</view>
			<!-- <view class="order-no">{{item.foregiftMoney}}</view> -->
		</view>
		<view class="detail">
			<view class="list">
				<view class="title">订单详情</view>
				<view class="item">
					<view class="name">订单号：</view>
					<view class="info">
						{{item.stringId || ''}}
					</view>
				</view>
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
				<view class="item">
					<view class="name">归还时间：</view>
					<view class="info">{{item.leaseFinishTime || ''}}</view>
				</view>
			</view>
			<view class="list">
				<view class="title">使用详情</view>
				<view class="item">
					<view class="name">收费标准：</view>
					<view class="info" v-if="item.cycle === 1">{{item.price / 2 || 0}}元/小时</view>
					<view class="info" v-if="item.cycle === 2">{{item.price || 0}}元/小时</view>
				</view>
				<view class="item">
					<view class="name">租借押金：</view>
					<view class="info">{{item.foregiftStatus === 1 ? "免押" : "99元"}}</view>
				</view>
				<view class="item">
					<view class="name">免费时长：</view>
					<view class="info">{{item.freeTime || 0}}分钟</view>
				</view>
				<view class="item">
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
		margin: 40rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		 box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
		 overflow: hidden;
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
			.order-no{
				position: absolute;
				right: 30rpx;
				font-size: 28rpx;
				color: #333333;
			}
			&::before {
				content: "";
				position: absolute;
				bottom: 1rpx;
				left: 30rpx;
				right: 30rpx;
				background: #E8EAEC;
				height: 2rpx;
				display: block;
			}

			.stadus {
				height: 44rpx;
				text-align: center;
				line-height: 44rpx;
				border-radius: 44rpx;
				font-size: 28rpx;
				position: relative;

				&.error {
					color: #F14322;
				}

				&.warning {
					color: #F1A921;
				}

				&.ok {
					color: #49F3C1;
				}
			}
		}

		.detail {
			line-height: 60rpx;
			padding: 0 30rpx;
			background: #FFFFFF;
			.list{
				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #E8EAEC;
				.title{
					height: 60rpx;
					line-height: 60rpx;
					color: #333333;
					font-size: 24rpx;
				}
				&:last-child{
					border: 0;
				}
			}
			.item {
				font-size: 24rpx;
				color: #999999;
				display: flex;
				align-items: center;
				.info {
					color: #999999;

					&.blue {
						color: #22A6F1;
					}

					&.red {
						color: #F14322;
					}
				}
			}
		}
		.adContainer{
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0
		}
	}
</style>
