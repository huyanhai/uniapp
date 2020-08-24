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
		<view class="info">
			<view class="top">
				<view class="post">
					<image :src="moreInfo.headUrl" class="img"></image>
				</view>
				<view class="user">
					{{moreInfo.nickname}}
				</view>
			</view>
			<view class="bottom">
				<view class="left">
					<text class="money"><text class="fh">￥</text>{{moreInfo.balance}}</text>
					<text class="name">余额</text>
				</view>
				<view class="right">
					<text class="money"><text class="fh">￥</text>{{moreInfo.margin}}</text>
					<text class="name">押金</text>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">服务</view>
			<view class="list">
				<view class="item" @click="goPage('recharge')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-qb.png" class="label"></image>
					<text class="name">充值</text>
				</view>
				<view class="item" @click="goPage('reflect')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-tx.png" class="label"></image>
					<text class="name">提现</text>
				</view>
				<view class="item" @click="goPage('question')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-wt.png" class="label"></image>
					<text class="name">常见问题</text>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="title">其他</view>
			<view class="list">
				<view class="item" @click="goPage('order')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-bj.png" class="label"></image>
					<text class="name">我的订单</text>
				</view>
				<view class="item" @click="goPage('joinIn')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-hz.png" class="label"></image>
					<text class="name">合作加盟</text>
				</view>
				<view class="item" @click="goPage('feedback')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-fk.png" class="label"></image>
					<text class="name">意见反馈</text>
				</view>
				<view class="item" @click="goPage('use')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-zn.png" class="label"></image>
					<text class="name">使用指南</text>
				</view>
				<view class="item" @click="goPage('aboutUs')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-gy.png" class="label"></image>
					<text class="name">关于我们</text>
				</view>
				<view class="item" @click="goPage('history')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-zb.png" class="label"></image>
					<text class="name">交易明细</text>
				</view>
				<view class="item" @click="goPage('aboutUs')">
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini%2Fuser-d.png" class="label"></image>
					<text class="name">代理商</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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
		methods:{
			async checkAuth() {
			  let that = this;
			  this.authCode = uni.getStorageSync("authCode") || null;
			  if (!this.authCode) {
			    uni.navigateTo({
			    	url:'login'
			    })
			  } else {
				  this.getUserInfo()
			  }
			},
			goPage(path){
				const nopage = ['recharge','reflect','history']
				if(nopage.indexOf(path) > -1) return uni.showToast({icon:"none",title:"系统开发中"})
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
		background: #FFFFFF;
		.info {
			overflow: hidden;
			background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/user-bg.png") no-repeat center -100rpx;
			width: 750rpx;
			height: 340rpx;
			background-size: 100% auto;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 100rpx;
			box-sizing: border-box;
			.top {
				display: flex;
				align-items: center;
				flex-direction: column;
				width: 120rpx;
				.post {
					width: 120rpx;
					height: 120rpx;
					position: relative;
					margin-bottom: 10rpx;
					.img {
						width: 120rpx;
						height: 120rpx;
						border-radius: 120rpx;
					}
				}

				.user {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					width: 100%;
					font-size: 34rpx;
					color: #FFFFFF;
					margin-bottom: 10rpx;
					text-align: center;
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
						font-size: 24rpx;
						color: #FFDD00;
					}

					.money {
						font-size: 60rpx;
						color: #FFDD00;
						.fh{
							font-size: 24rpx;
						}
					}
				}
				.left{
					margin-right: 100rpx;
				}
			}
		}
		.box{
			margin-bottom: 40rpx;
			.title{
				font-size: 28rpx;
				color: #333333;
				margin: 0 40rpx 40rpx 40rpx;
			}
		.list {
			background: #FFFFFF;
			padding: 0 30rpx;
			display: flex;
			flex-wrap: wrap;
			.item {
				width: calc(100%/3);
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-bottom: 40rpx;
				.label {
					width: 60rpx;
					height: 60rpx;
					flex: 0 0 auto;
					margin-bottom: 20rpx;
				}

				.name {
					font-size: 24rpx;
					color: #333333;
					flex: 1 0 auto;
					margin: 0 30rpx;
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
