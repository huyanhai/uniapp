<!--
 * @Author: huyanhai
 * @since: 2020-04-19 20:32:49
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 21:10:45
 * @FilePath: /uniapp/pages/index/loanSuccess.vue
 * @Description: 免押租借成功
 -->
<template>
	<view class="loan-success-content">
		<view class="top-info">
			<view class="tips">请取出亮灯闪烁的充电宝</view>
			<view class="cdzt">
				<view class="zsq" :class="'kong_6'">
					<div class="box">
						<view class="item" :class="{'active':number - index === cardSlot}" v-for="(item,index) in number" :key="index">
							{{number - index}}
						</view>
					</div>
					<!-- <image class="ewm12" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/cdb12.png" v-if="number===12"></image> -->
					<image class="ewm" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/cdb6.png"></image>
				</view>
				<view class="info"></view>
			</view>
			<view class="countdown" v-if="time>0">离自动归还充电宝还剩余({{time}}s)</view>
		</view>
		<view class="zj-tips">
			<view class="title">计费标准</view>
			<text class="info" v-if="tips.cycle === 1">{{tips.price/2}}元/半小时\n租借5分钟内免费，日封顶{{tips.dayMoney}}元，总封顶:99元</text>
			<text class="info" v-if="tips.cycle === 2">{{tips.price}}元/小时\n租借5分钟内免费，日封顶{{tips.dayMoney}}元，总封顶:99元</text>
		</view>
		<view class="bottom">
			<view class="btn zn" @click="goUse">使用指南</view>
			<view class="btn home" @click="goHome">返回首页</view>
		</view>
	</view>
</template>

<script>
	import { get, post } from '../../libs/request.js';
	export default {
		data(){
			return {
				orderNum:null,
				number:null,
				cardSlot:null,
				timer:null,
				time:60,
				tips:{}
			}
		},
		onLoad(e){
			let {orderNum,cardSlot,number} = e;
			if(orderNum) this.orderNum = orderNum
			if(cardSlot) this.cardSlot = Number(cardSlot)
			if(number) this.number = Number(number)
			console.log(e,cardSlot,number)
			this.countdown()
			this.getDetails()
		},
		onHide(){
			clearInterval(this.timer)
		},
		methods:{
			countdown(){
				let _this = this;
				this.timer = setInterval(function(){
					if(_this.time>0){
						_this.time --
					} else {
						clearInterval(_this.timer)
					}
				},1000)
			},
			goUse(){
				uni.navigateTo({
					url:"use"
				})
			},
			goHome(){
				uni.reLaunch({
				    url: 'index'
				});
			},
			getDetails(){
				get(`order/info/${this.orderNum}`).then(res => {
					if (res.code === 200) {
						this.tips = res.data
					}
				});
			},
		}
	};
</script>

<style lang="scss">
	@keyframes wave-animate {
	  0% {
	    transform: scale(0.5);
	    transform-origin: center;
		
	  }
	  100% {
	    transform: scale(1);
	    transform-origin: center;
	  }
	}
	.loan-success-content{
		height: 100vh;
		position: relative;
		background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/zj-bj.png") no-repeat top center;
		background-size:750rpx 490rpx;
		overflow: hidden;
		.top-info{
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			margin-top: 30rpx;
			.tips{
				font-size: 32rpx;
				color: #333333;
			}
			.cdbzt{
				width: 423rpx;
				height: 243rpx;
				display: block;
				margin: 20rpx 0;
			}
			.cdzt{
				background: #EEEEEE;
				border-radius: 20rpx;
				box-shadow: 0 0 20rpx rgba(#000,0.2);
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 20rpx 0;
				padding: 0 40rpx;
				.zsq{
					flex: 1 0 auto;
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					height: 100%;
					&.kong_6{
						height: 220rpx;
						.box{
							display: flex;
							align-items: center;
							justify-content: center;
							flex: 1 0 auto;
							.item{
								width: 24rpx;
								margin-right: 20rpx;
								position: relative;
								font-size: 20rpx;
								color: #999999;
								text-align: center;
								display: flex;
								flex-direction: column;
								&.active{
									&::after{
										position: absolute;
										width: 34rpx;
										height: 34rpx;
										background: #29ee77;
										box-shadow: 0 0 10rpx #29ee77;
										left: 50%;
										margin-left: -17rpx;
										top: 30rpx;
										content: "";
										display: block;
										border-radius: 34rpx;
										animation: wave-animate 0.8s infinite ease-out;
									}
									&::before{
										background: #FFDD00;
									}
								}
								&::before{
									width: 24rpx;
									content: "";
									height: 140rpx;
									background: #333;
									border-radius: 6rpx;
									margin-bottom: 5rpx;
								}
							}
						}
						.ewm{
							width: 65rpx;
							height: 141rpx;
						}
						
					}
					&.kong_12{
						flex-direction: column-reverse;
						flex-wrap: wrap;
						margin: 20rpx 0;
						.box{
							display: flex;
							align-items: center;
							justify-content: center;
							flex: 1 0 auto;
							flex-wrap: wrap;
							width: 300rpx;
							flex-direction: row;
						}
						.ewm12{
							flex: 0 0 auto;
							width: 290rpx;
							height: 59rpx;
							margin-bottom: 20rpx;
						}
						.item{
							width: calc(50% - 20rpx);
							flex: 1 0 auto;
							margin-right: 20rpx;
							position: relative;
							font-size: 20rpx;
							color: #999999;
							text-align: center;
							display: flex;
							margin-bottom: 10rpx;
							&:nth-child(2n+2){
								margin-right: 0;
							}
							&.active{
								&::after{
									position: absolute;
									width: 24rpx;
									height: 24rpx;
									background: #29ee77;
									box-shadow: 0 0 10rpx #29ee77;
									left: 50%;
									margin-left: -12rpx;
									top: 50%;
									margin-top: -12rpx;
									content: "";
									display: block;
									border-radius: 34rpx;
									animation: wave-animate 0.8s infinite ease-out;
								}
								&::before{
									background: #FFDD00;
								}
							}
							&::before{
								width: 100%;
								content: "";
								height: 18rpx;
								background: #333;
								border-radius: 6rpx;
							}
						}
					}
					
				}
				.info{
					flex: 0 0 auto;
				}
			}
			.countdown{
				font-size: 24rpx;
				color: #333333;
			}
		}
		.zj-tips{
			margin: 20rpx 30rpx 0 30rpx;
			height: 210rpx;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
			border-radius: 10rpx;
			display: flex;
			justify-content: center;
			background: #FFFFFF;
			flex-direction: column;
			box-sizing: border-box;
			padding: 0 20rpx;
			.title{
				font-size: 28rpx;
				color: #333333;
				margin-bottom: 40rpx;
			}
			.info{
				font-size: 24rpx;
				color: #999999;
			}
		}
		
	.bottom{
		position: absolute;
		bottom: 60rpx;
		width: 100%;
		display: flex;
		padding: 0 30rpx;
		box-sizing: border-box;
		.btn{
			width: 30%;
			flex: 1 0 auto;
			height: 80rpx;
			border-radius: 80rpx;
			background: #303030;
			color: #FFDD00;
			text-align: center;
			line-height: 80rpx;
			&.zn{
				background: #FFDD00;
				color: #303030;
				margin-right: 20rpx;
			}
			&.home{
				margin-left: 20rpx;
			}
		}
	}
}
</style>
