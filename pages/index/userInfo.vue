<!--
 * @Author: huyanhai
 * @since: 2020-04-19 21:53:26
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 21:53:45
 * @FilePath: /uniapp/pages/index/userInfo.vue
 * @Description: 用户中心
 -->
<template>
	<view class="user-info-content">
		<view class="info line-color">
			<view class="top">
				<view class="post">
					<image :src="moreInfo.headUrl" class="img"></image>
				</view>
				<view class="user">
					<text class="name">{{moreInfo.nickname}}</text>
					<text class="id">ID：{{moreInfo.id}}</text>
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<text class="name">押金</text>
					<text class="money">￥{{moreInfo.margin}}</text>
				</view>
				
				<!-- <view class="right" @click="goPage('balance')"> -->
				<view class="right">
					<text class="name">余额</text>
					<text class="money">￥{{moreInfo.balance}}</text>
				</view>
			</view>
		</view>
		<view class="list">
			<view class="item" @click="goPage('order')">
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-order.png" class="label"></image>
				<text class="name">我的订单</text>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-more.png" class="more"></image>
			</view>
			<view class="item" @click="goPage('joinIn')">
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-jm.png" class="label"></image>
				<text class="name">合作加盟</text>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-more.png" class="more"></image>
			</view>
			<view class="item" @click="goPage('question')">
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-question.png" class="label"></image>
				<text class="name">问题或意见</text>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-more.png" class="more"></image>
			</view>
			<view class="item" @click="showCall">
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-kf.png" class="label"></image>
				<text class="name">客服中心</text>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-more.png" class="more"></image>
			</view>
			<view class="item" @click="goPage('aboutUs')">
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-gywm.png" class="label"></image>
				<text class="name">关于我们</text>
				<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Ficon-more.png" class="more"></image>
			</view>
		</view>
		<text class="copyright">
			当前版本2.0.3 \n Copyright@2019 起电宝租电
		</text>
		<callUs :show.sync="showCallUs" />
		<loginSheet :show="showSheet" @authSuccess="authSuccess"/>
	</view>
</template>

<script>
	import callUs from '../../components/callUs';
	import loginSheet from "../../components/loginSheet";
	import { get,post } from "../../libs/request.js"
	
	export default {
		data(){
			return {
				showSheet:false,
				showCallUs:false,
				moreInfo:{}
			}
		},
		onLoad(){
			this.checkAuth();
		},
		components:{
			loginSheet,
			callUs
		},
		methods:{
			async checkAuth() {
			  let that = this;
			  this.authCode = uni.getStorageSync("authCode") || null;
			  if (!this.authCode) {
			    that.showSheet = true;
			  } else {
				  this.getUserInfo()
			  }
			},
			authSuccess(e) {
			  this.authCode = uni.getStorageSync("authCode") || null;
			  this.showSheet = false;
			  this.getUserInfo();
			},
			goPage(path){
				uni.navigateTo({
				  url: path
				});
			},
			showCall(){
				this.showCallUs = true;
			},
			getUserInfo(){
				get('/login/info').then(res => {
					if(res.code === 200){
						this.moreInfo = res.data
					}
				});
			}
		}
	};
</script>

<style lang="scss">
	@import url("../../assets/scss/icon.scss");

	.user-info-content {
		.info {
			overflow: hidden;

			.top {
				display: flex;
				align-items: center;
				margin: 0 30rpx;

				.post {
					width: 138rpx;
					height: 138rpx;
					position: relative;

					&::before {
						width: 128rpx;
						height: 128rpx;
						border-radius: 128rpx;
						content: "";
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						border: 2rpx solid rgba($color: #fff, $alpha: 0.1);
					}

					&::after {
						width: 108rpx;
						height: 108rpx;
						border-radius: 108rpx;
						content: "";
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
						border: 2rpx solid rgba($color: #fff, $alpha: 0.2);
					}

					.img {
						width: 90rpx;
						height: 90rpx;
						border-radius: 90rpx;
						content: "";
						position: absolute;
						left: 50%;
						top: 50%;
						transform: translate(-50%, -50%);
					}
				}

				.user {
					display: flex;
					flex-direction: column;
					margin-left: 30rpx;

					.name {
						font-size: 34rpx;
						color: #FFFFFF;
						margin-bottom: 10rpx;
					}

					.id {
						font-size: 26rpx;
						color: #FFFFFF;
					}
				}
			}

			.bottom {
				display: flex;
				justify-content: space-between;
				margin: 40rpx 0;
				.left,
				.right {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-items: center;
					width: 50%;
					text-align: center;
					position: relative;

					.name {
						font-size: 28rpx;
						color: #FFFFFF;
					}

					.money {
						font-size: 50rpx;
						color: #FFFFFF;
					}
				}

				.left {
					&::before {
						content: '';
						position: absolute;
						height: 40rpx;
						width: 2rpx;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						background: #FFFFFF;
					}
				}
			}
		}

		.list {
			background: #FFFFFF;
			padding: 0 30rpx;
			margin-top: 20rpx;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
			
			.item {
				display: flex;
				height: 90rpx;
				border-bottom: 2rpx solid #E8EAEC;
				align-items: center;
				justify-content: center;
				&:last-child{
					border: none;
				}
				.label {
					width: 52rpx;
					height: 52rpx;
					flex: 0 0 auto;
				}

				.name {
					font-size: 28rpx;
					color: #333333;
					flex: 1 0 auto;
					margin: 0 30rpx;
				}

				.more {
					width: 16rpx;
					height: 29rpx;
					flex: 0 0 auto;
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
