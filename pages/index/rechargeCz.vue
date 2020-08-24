<template>
	<view class="balance-content">
		<view class="balance-box">
			<text class="label">
				充值金额
			</text>
			<view class="tips">每满99元可租借一个充电宝</view>
			<view class="items-js">
				<view class="item">
					<text class="text">个人押金</text>
					<text class="num">0元</text>
				</view>
				<view class="item">
					<text class="text">个人余额</text>
					<text class="num">0元</text>
				</view>
				<view class="item">
					<text class="text">已借充电宝</text>
					<text class="num">1个</text>
				</view>
			</view>
		</view>
		<view class="balance-box">
			<text class="label">
				充值押金
			</text>
			<view class="form">
				<radio-group @change="changed" class="group">
						<label class="ui-radio" :class="{active:item.checked}" v-for="(item,index) in items" :key="index">
							<radio :value="item.value" :checked="item.checked"/>
							<text class="text">{{item.name}}元</text>
						</label>
				</radio-group>
			</view>
		</view>
		<view class="balance-box">
			<text class="label">
				支付方式
			</text>
			<view class="choose-fs">
				<view class="icons">
					<image class="img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-wchart.png" mode=""></image>
					微信支付
				</view>
				<label>
					<checkbox /><text></text>
				</label>
			</view>
		</view>
		<view class="operation">
			<view class="recharge back" @click="recharge">返回首页</view>
			<view class="recharge ok" @click="recharge">我要租借</view>
		</view>
		<view class="history">点击租借表示已阅读即同意<text class="text" @click="goHistory">《服务协议》</text></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					{
						value:"99",
						name:"99",
						checked:true
					}
				],
			};
		},
		methods:{
			changed(e){
				let data = e.detail.value;
				let items = JSON.parse(JSON.stringify(this.items))
				for(let item of items) {
					item['checked'] = item.value === data
				}
				this.items = items;
			},
			recharge(){
				uni.navigateTo({
				  url: "userInfo"
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
	.balance-box{
		margin: 0 30rpx 30rpx 30rpx;
		.tips{
			font-size: 24rpx;
			color: #999999;
		}
		.items-js{
			border-radius: 10rpx;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
			height: 150rpx;
			margin-top: 30rpx;
			display: flex;
			justify-content: space-between;
			.item{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				flex: 1 0 auto;
				position: relative;
				&:last-child{
					&::after{
						display: none;
					}
				}
				&::after{
					content: "";
					height: 90rpx;
					width: 2rpx;
					background: #DFDFDF;
					display: block;
					right: 0;
					top: 50%;
					transform: translateY(-50%);
					position: absolute;
				}
				.text{
					font-size: 28rpx;
					color: #333333;
				}
				.num{
					font-size: 28rpx;
					color: #333333;
				}
			}
		}
	}
	.label{
		font-size: 28rpx;
		color: #333333;
		width: 100%;
		text-align: center;
		margin-top: 70rpx;
	}
	.choose-fs{
		display: flex;
		height: 130rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		padding: 0 20rpx;
		margin-top: 30rpx;
		.icons{
			display: flex;
			align-items: center;
			.img{
				width: 40rpx;
				height: 40rpx;
				margin-right: 10rpx;
			}
			font-size: 24rpx;
			color: #333333;
		}
	}
	.form{
		.group{
			display: flex;
			flex-wrap: wrap;
		}
		.ui-radio{
			background: #DFDFDF;
			border-radius: 8rpx;
			width: calc((100% - 40rpx)/2);
			height: 90rpx;
			text-align: center;
			white-space:nowrap;
			font-size: 26rpx;
			line-height: 90rpx;
			margin-top: 30rpx;
			margin-right: 40rpx;
			box-sizing: border-box;
			&:nth-child(2n + 2){
				margin-right: 0;
			}
			.text{
				color:#333333;
				font-size: 32rpx;
			}
			&.active{
			  background: #303030;
			  border-radius: 8rpx;
			  width: calc((100% - 40rpx)/2);
			  height: 90rpx;
			  text-align: center;
			  white-space:nowrap;
			  font-size: 32rpx;
			  line-height: 90rpx;
			  box-sizing: border-box;
			  .text{
			    color:#FFDD00;
			    font-size: 32rpx;
			  }
			}
		}
		radio {
		  display: none;
		}
	}
	.operation{
		margin: 100rpx 30rpx 0 30rpx;
		display: flex;
		justify-content: space-between;
		.recharge{
			height: 90rpx;
			line-height: 90rpx;
			text-align: center;
			border-radius: 90rpx;
			background: #303030;
			font-size: 32rpx;
			color: #FFDD00;
			flex: 1 0 auto;
			&.back{
				margin-right: 20rpx;
				background: #FFDD00;
				color: #303030;
			}
			&.ok{
				margin-left: 20rpx;
			}
		}
	}
	.history{
		position: absolute;
		bottom: 120rpx;
		text-align: center;
		font-size: 28rpx;
		color: #999999;
		left: 50%;
		transform: translateX(-50%);
		width: 100%;
		.text{
			color: #FFDD00;
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
</style>
