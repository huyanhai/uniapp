<!--
 * @Author: huyanhai
 * @since: 2020-04-19 11:48:57
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 22:43:36
 * @FilePath: /uniapp/components/orderItem.vue
 * @Description: 订单item
 -->
<template>
	<view class="order-item-content" @click="goDetail(item)">
		<view class="top">
			<view class="stadus error warning ok">{{orderStatus[item.leaseStatus] || '无状态'}}</view>
		</view>
		<view class="info">
			<view class="item">
				<text class="name">订单编号：</text>
				<text class="detail num">
					{{item.stringId}}
				</text>
			</view>
			<view class="item">
				<text class="name">租借费用：</text>
				<text class="detail num" v-if="item.totalMoney && item.totalMoney !== 'null' || item.totalMoney === 0">
					{{item.totalMoney}}元
				</text>
			</view>
			<view class="item">
				<text class="name">设备商家：</text>
				<text class="detail">{{item.shopName}}</text>
			</view>
			<view class="item">
				<text class="name">租借时间：</text>
				<text class="detail">{{item.updateDate}}</text>
			</view>
		</view>
		<view class="pro-name">充电宝</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				orderStatus:{
					1:"等待弹出",
					2:"租借中",
					3:"租借完成",
					4:"已撤销",
					5:"超时订单",
					6:"扣款失败"
				}
			}
		},
		props: {
			item: {
				type: Object
			}
		},
		methods: {
			goDetail(e) {
				uni.navigateTo({
					url: "orderDetail?item=" + JSON.stringify(e)
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
		position: relative;
		.pro-name{
			width: 110rpx;
			height: 40rpx;
			background: #303030;
			border-radius: 10rpx;
			text-align: center;
			line-height: 40rpx;
			font-size: 22rpx;
			color: #FFDD00;
			position: absolute;
			top: 30rpx;
			right: 30rpx;
		}
		.top{
			display: flex;
			align-items: center;
			font-size: 28rpx;
			color: #333333;
			.stadus{
				height: 44rpx;
				line-height: 44rpx;
				border-radius: 44rpx;
				font-size: 32rpx;
				&.error{
					color: #F14322;
				}
				&.warning{
					color: #FFC600;
				}
				&.ok{
					color: #333333;
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
