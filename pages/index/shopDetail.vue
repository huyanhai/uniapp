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
				<image class="post" src="../../static/logo.png"></image>
				<view class="info">
					<view class="name">金都专业烫染拉名店</view>
					<view class="address">营业时间：09:00-22:00</view>
				</view>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-calling.png" class="tell" @click="call"></image>
			</view>
			<view class="shop-address">地址：重庆市渝北区龙塔街道52号</view>
			<view class="detail">
				<view class="item">可租借：8</view>
				<view class="item">可归还：2</view>
				<view class="item">距离：200米</view>
			</view>
		</view>
		<view class="img-list">
			<image src="../../static/logo.png" class="left"></image>
			<view class="right">
				<image src="../../static/logo.png" class="t"></image>
				<image src="../../static/logo.png" class="b"></image>
			</view>
		</view>
		<view class="go-map" @click="goMap">去这里</view>
	</view>
</template>

<script>
export default {
	methods:{
		goMap(){
			uni.openLocation({
			  latitude: that.item.latitude,
			  longitude: that.item.longitude,
			  name: "黄龙万科中心",
			  address: "学院路77号",
			  success: function() {
			    console.log("success");
			  },
			  fail(e) {
			    console.log(e);
			  }
			});
		},
		call(){
			uni.makePhoneCall({
			  phoneNumber: "4008123277" //仅为示例
			});
		}
	}
};
</script>

<style lang="scss">
	@import url("../../assets/scss/icon.scss");
	.shop-detail-content{
		display: flex;
		flex-direction: column;
		.top{
			.shop-info{
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 30rpx;
				.post{
					width: 136rpx;
					height: 136rpx;
					border-radius: 136rpx;
					float: 0 0 auto;
					display: block;
				}
				.info{
					flex: 1 0 auto;
					width: 100rpx;
					margin: 0 30rpx;
					.name{
						font-size: 34rpx;
						color: #FFFFFF;
						margin-bottom: 22rpx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: normal;
					}
					.address{
						font-size: 26rpx;
						color: #FFFFFF;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: normal;
					}
				}
				.tell{
					flex: 0 0 auto;
					width: 60rpx;
					height: 60rpx;
					border-radius: 60rpx;
					overflow: hidden;
				}
			}
			.shop-address{
				font-size: 26rpx;
				color: #FFFFFF;
				margin: 30rpx 55rpx;
			}
			.detail{
				display: flex;
				justify-content: space-between;
				font-size: 26rpx;
				color: #FFFFFF;
				margin: 0 55rpx 30rpx 55rpx;
			}
		}
		.img-list{
			display: flex;
			margin: 30rpx;
			.left{
				width: 335rpx;
				height: 450rpx;
				flex: 0 0 auto;
				border-radius: 12rpx;
				overflow: hidden;
				margin-right: 20rpx;
			}
			.right{
				flex: 1 0 auto;
				display: flex;
				flex-direction: column;
				.t{
					width: 100%;
					height: 215rpx;
					flex: 0 0 auto;
					border-radius: 20rpx;
					overflow: hidden;
					margin-bottom: 20rpx;
				}
				.b{
					width: 100%;
					height: 215rpx;
					flex: 1 0 auto;
					border-radius: 20rpx;
					overflow: hidden;
				}
			}
		}
		.go-map{
			height: 90rpx;
			line-height: 90rpx;
			border-radius: 90rpx;
			background: #22A6F1;
			font-size: 30rpx;
			color: #FFFFFF;
			margin: 30rpx;
			text-align: center;
		}
	}
</style>