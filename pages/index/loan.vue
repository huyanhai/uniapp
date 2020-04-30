<!--
 * @Author: huyanhai
 * @since: 2020-04-19 20:32:49
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 20:33:07
 * @FilePath: /uniapp/pages/index/loan.vue
 * @Description: 免押租借
 -->
<template>
	<view class="loan-content">
		<image class="studus-img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-zjtips.png"></image>
		<text class="tips">充电线自带Aandroid、IOS、Type-C三种充电线</text>
		<view class="rule">
			<view class="title">
				计费规则：
			</view>
			<text class="item">
				1.<text class="num">0.5</text>元/小时；
				2. 租借5分钟内免费，日封顶10.00元，总封顶99.00元；
				3. 押金99.00元，支持免押服务。
			</text>
		</view>
		<view class="submit" @click="submit">
			<text class="b">免押金租借</text>
			<text class="s">（微信支付分550分以上有机会）</text>
		</view>
		<view class="check-agreement">
			<checkbox-group @change="changed">
				<checkbox class="check" value="1"></checkbox>
			</checkbox-group>
			同意
			<text class="agreement">《委托扣款授权书》</text>
		</view>
	</view>
</template>

<script>
	import { get,post } from "../../libs/request.js"
	export default {
		data(){
			return {
				checked: []
			}
		},
		methods:{
			changed(e){
				this.checked = e.detail.value;
			},
			submit(e){
				if(this.checked.length > 0){
					post('wxpay/payscore').then((res)=>{
						console.log(res)
					})
					// uni.reLaunch({
					//     url: 'loanSuccess'
					// });
				} else {
					uni.showToast({
						title:'请勾选协议'
					});
				}

			}
		}
	};
</script>

<style lang="scss">
	.loan-content{
		padding: 30rpx;
		box-sizing: border-box;
		.studus-img{
			width: 428rpx;
			height: 350rpx;
			margin: 60rpx auto 40rpx auto;
			display: block;
		}
		.tips{
			font-size: 28rpx;
			color: #333333;
			text-align: center;
			display: block;
		}
		.rule{
			margin-top: 80rpx;
			.title{
				font-size: 28rpx;
				color: #333333;
			}
			.item{
				font-size: 26rpx;
				color: #777777;
				line-height: 48rpx;
				.num{
					color: #22A6F1;
				}
			}
		}
		.submit{
			height: 90rpx;
			margin: 70rpx 0 0 0;
			background: #22A6F1;
			color: #FFFFFF;
			border-radius: 90rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			.b{
				font-size: 30rpx;
			}
			.s{
				font-size: 24rpx;
			}
		}
		.check-agreement{
			margin-top: 20rpx;
			display: flex;
			justify-content: center;
			font-size: 24rpx;
			color: #333333;
			align-items: center;
			.check{
				width: 24rpx;
				height: 24rpx;
				position: relative;
				margin-right: 10rpx;
				.wx-checkbox-input{
					width: 24rpx;
					height: 24rpx;
					box-sizing: border-box;
					position: absolute;
					top: 0;
				}
			}
			.agreement{
				color: #22A6F1;
			}
		}
	}
</style>
