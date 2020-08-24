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
		<menus :title="title"/>
		<image class="bg-img" :src="shopDetials.headImg"></image>
		<view class="top">
			<view class="shop-info">
				<view class="info">
					<view class="name">{{ shopDetials.shopName }}</view>
					<view class="address">地址：{{ shopDetials.address || '' }}</view>
					<view class="address" @click="call(shopDetials.phone)">电话：{{ `${shopDetials.phone}` }}</view>
					<view class="address">营业时间：{{ `${shopDetials.startTime || ''} - ${shopDetials.endTime || ''}` }}</view>
				</view>
				<image class="post" :src="shopDetials.shopImage"></image>
			</view>
			<view class="detail">
				<view class="item">可租借：{{shopDetials.canBorrowQuantity}}</view>
				<view class="item">可归还：{{shopDetials.returnableQuantity}}</view>
				<view class="item">距离：{{parseInt(shopDetials.distance || 0)}}米</view>
			</view>
		</view>
		<view class="go-map" @click="goMap">去这里</view>
	</view>
</template>

<script>
import { get, post } from '../../libs/request.js';
import menus from "../../components/menus.vue";
export default {
	data() {
		return {
			stringId: '',
			sn: '',
			shopDetials: {},
			lon:null,
			lat:null,
			title:null
		};
	},
	onLoad(e) {
		this.stringId = e.stringId;
		this.sn = e.sn;
		this.longitude = e.longitude;
		this.latitude = e.latitude;
		if (this.stringId) {
			this.getShopdetails('shop/detail', {
				sid: this.stringId,
				lng: this.longitude,
				lat: this.latitude
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
						
					if(res.data['shopImage']){
						res.data['shopImage'] = res.data['shopImage'].split(',')
					}
					this.shopDetials = res.data;
				}
			});
		}
	},
	components:{
		menus
	}
};
</script>

<style lang="scss">
@import url('../../assets/scss/icon.scss');
.shop-detail-content {
	display: flex;
	flex-direction: column;
	.bg-img{
		position: absolute;
		top: 0;
		width: 100%;
		height: 400rpx;
	}
	.top {
		margin-top: 220rpx;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		overflow: hidden;
		position: relative;
		z-index: 100;
		background: #FFFFFF;
		.shop-info {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 50rpx 30rpx 30rpx 30rpx;
			.post {
				width: 160rpx;
				height: 160rpx;
				border-radius: 10rpx;
				float: 0 0 auto;
				display: block;
			}
			.info {
				flex: 1 0 auto;
				width: 100rpx;
				margin: 0 30rpx;
				.name {
					font-size: 32rpx;
					color: #333333;
					margin-bottom: 22rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
				}
				.address {
					font-size: 24rpx;
					color: #999999;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: normal;
					line-height: 50rpx;
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
			color: #333333;
			margin: 0 55rpx 30rpx 55rpx;
			background: #F2F2F2;
			border-radius: 10rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 20rpx;
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
		background: #303030;
		font-size: 30rpx;
		color: #FFDD00;
		margin: 30rpx;
		text-align: center;
	}
}
</style>
