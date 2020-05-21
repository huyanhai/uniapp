<!--
 * @Author: huyanhai
 * @since: 2020-04-19 17:57:48
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 17:57:59
 * @FilePath: /uniapp/pages/index/shopDetail.vue
 * @Description: 商家详情
 -->
<template>
	<view class="shop-detail-content">
		<view class="top line-color">
			<view class="shop-info">
				<image class="post" :src="shopDetials.shopImage"></image>
				<view class="info">
					<view class="name">{{ shopDetials.shopName }}</view>
					<view class="address">营业时间：{{ `${shopDetials.startTime} - ${shopDetials.endTime}` }}</view>
				</view>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-calling.png" class="tell" @click="call(shopDetials.phone)"></image>
			</view>
			<view class="shop-address">地址：{{ shopDetials.address || '' }}</view>
			<view class="detail">
				<view class="item">可租借：{{shopDetials.canBorrowQuantity}}</view>
				<view class="item">可归还：{{shopDetials.returnableQuantity}}</view>
				<view class="item">距离：{{shopDetials.distance}}米</view>
			</view>
		</view>
		<!-- <view class="img-list">
			<image src="../../static/logo.png" class="left"></image>
			<view class="right">
				<image src="../../static/logo.png" class="t"></image>
				<image src="../../static/logo.png" class="b"></image>
			</view>
		</view> -->
		<view class="go-map" @click="goMap">去这里</view>
	</view>
</template>

<script>
import { get, post } from '../../libs/request.js';

export default {
	data() {
		return {
			stringId: '',
			sn: '',
			shopDetials: {}
		};
	},
	onLoad(e) {
		this.stringId = e.stringId;
		this.sn = e.sn;
		if (this.stringId) {
			this.getShopdetails('shop/detail', {
				sid: this.stringId
			});
		} else {
			this.getShopdetails('driver/shop/info', {
				sn: this.sn
			});
		}
	},
	methods: {
		goMap() {
			console.log(this.shopDetials)
			uni.openLocation({
				latitude: Number(this.shopDetials.latitude),
				longitude: Number(this.shopDetials.longitude),
				name: this.shopDetials.name,
				address: this.shopDetials.address,
				success: function() {
					console.log('success');
				},
				fail(e) {
					console.log(e);
				}
			});
		},
		call(no) {
			uni.makePhoneCall({
				phoneNumber: no //仅为示例
			});
		},
		getShopdetails(url, data) {
			post(url, data).then(res => {
				if (res.code === 200) {
					this.shopDetials = res.data;
					console.log(res.data);
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import url('../../assets/scss/icon.scss');
.shop-detail-content {
	display: flex;
	flex-direction: column;
	.top {
		.shop-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 30rpx;
			.post {
				width: 136rpx;
				height: 136rpx;
				border-radius: 136rpx;
				float: 0 0 auto;
				display: block;
			}
			.info {
				flex: 1 0 auto;
				width: 100rpx;
				margin: 0 30rpx;
				.name {
					font-size: 34rpx;
					color: #ffffff;
					margin-bottom: 22rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
				}
				.address {
					font-size: 26rpx;
					color: #ffffff;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
				}
			}
			.tell {
				flex: 0 0 auto;
				width: 60rpx;
				height: 60rpx;
				border-radius: 60rpx;
				overflow: hidden;
			}
		}
		.shop-address {
			font-size: 26rpx;
			color: #ffffff;
			margin: 30rpx 55rpx;
		}
		.detail {
			display: flex;
			justify-content: space-between;
			font-size: 26rpx;
			color: #ffffff;
			margin: 0 55rpx 30rpx 55rpx;
		}
	}
	.img-list {
		display: flex;
		margin: 30rpx;
		.left {
			width: 335rpx;
			height: 450rpx;
			flex: 0 0 auto;
			border-radius: 12rpx;
			overflow: hidden;
			margin-right: 20rpx;
		}
		.right {
			flex: 1 0 auto;
			display: flex;
			flex-direction: column;
			.t {
				width: 100%;
				height: 215rpx;
				flex: 0 0 auto;
				border-radius: 20rpx;
				overflow: hidden;
				margin-bottom: 20rpx;
			}
			.b {
				width: 100%;
				height: 215rpx;
				flex: 1 0 auto;
				border-radius: 20rpx;
				overflow: hidden;
			}
		}
	}
	.go-map {
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 90rpx;
		background: #22a6f1;
		font-size: 30rpx;
		color: #ffffff;
		margin: 30rpx;
		text-align: center;
	}
}
</style>
