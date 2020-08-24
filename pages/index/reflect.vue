<template>
	<view class="balance-content">
		<view class="label">可提现金额</view>
		<view class="money">￥99.00</view>
		<view class="form">
			<text class="label">
				提现金额
			</text>
			<view class="input-box">
				<image class="money-type" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-money.png"></image>
				<input type="number" class="input" placeholder="请输入提现金额"/>
			</view>
			<text class="label">
				提现账户
			</text>
			<checkbox-group class="check-box">
				<!-- #ifdef MP-WEIXIN -->
				<label class="check-label">
					<image class="icon" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-wchart.png"></image>
					微信账户
				</label>
				<checkbox class="check-item" value="wechart"></checkbox>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<label class="check-label">
					<image class="icon" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-alipay.png"></image>
					支付宝账户
				</label>
				<checkbox class="check-item" value="alpay"></checkbox>
				<!-- #endif -->
			</checkbox-group>
		</view>
		<view class="operation">
			<view class="recharge" @click="recharge">确认提现</view>
		</view>
		<text class="history" @click="goHistory">提现记录 >></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			recharge(){
				uni.navigateTo({
				  url: "reflectSuccess"
				});
			},
			goHistory(){
				uni.navigateTo({
				  url: "history"
				});
			}
		}
	}
</script>

<style lang="scss">
.balance-content{
	height: 100vh;
	.label{
		font-size: 28rpx;
		color: #333333;
		width: 100%;
		text-align: center;
		margin-top: 70rpx;
	}
	.money{
		font-size: 50rpx;
		color: #333333;
		text-align: center;
	}
	.form{
		padding: 0 30rpx;
		.label{
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 10rpx;
			display: block;
			text-align: left;
		}
		.check-box{
			display: flex;
			justify-content: space-between;
			.check-label{
				display: flex;
				align-items: center;
				font-size: 28rpx;
				color: #333333;
				.icon{
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
			/* 重写 checkbox 样式 */
			/* 未选中的 背景样式 */
			checkbox .wx-checkbox-input{
			  border-radius: 50%;/* 圆角 */
			  width: 30rpx; /* 背景的宽 */
			  height: 30rpx; /* 背景的高 */
			}
			/* 选中后的 背景样式 （红色背景 无边框 可根据UI需求自己修改） */
			checkbox .wx-checkbox-input.wx-checkbox-input-checked{
			  border: 1rpx solid #FFDD00;
			  background: #FFDD00;
			}
			/* 选中后的 对勾样式 （白色对勾 可根据UI需求自己修改） */
			checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
			  border-radius: 50%;/* 圆角 */
			  width: 30rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
			  height: 30rpx;/* 选中后对勾大小，不要超过背景的尺寸 */
			  line-height: 30rpx;
			  text-align: center;
			  font-size:20rpx; /* 对勾大小 30rpx */
			  color:#fff; /* 对勾颜色 白色 */
			  background: transparent;
			  transform:translate(-50%, -50%) scale(1);
			  -webkit-transform:translate(-50%, -50%) scale(1);
			}
		}
		.input-box{
			height: 90rpx;
			background: #F2F4F6;
			border-radius: 4rpx;
			position: relative;
			.input{
				width: 100%;
				height: 100%;
				padding-left: 60rpx;
				color: #333333;
				font-size: 28rpx;
			}
			.money-type{
				width: 36rpx;
				height: 36rpx;
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				left: 15rpx;
			}
		}
	}
	.operation{
		margin: 100rpx 30rpx 0 30rpx;
		.recharge{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			border-radius: 90rpx;
			background: #22A6F1;
			font-size: 30rpx;
			color: #FFFFFF;
		}
	}
	.history{
		position: absolute;
		bottom: 120rpx;
		text-align: center;
		font-size: 28rpx;
		color: #22A6F1;
		left: 50%;
		transform: translateX(-50%);
	}
}
</style>
