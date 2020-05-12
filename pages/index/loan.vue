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
			<view class="title">计费规则：</view>
			<text class="item">
				1.
				<text class="num">0.5</text>
				元/小时； 2. 租借5分钟内免费，日封顶10.00元，总封顶99.00元； 3. 押金99.00元，支持免押服务。
			</text>
		</view>
		<view class="submit" @click="submit">
			<text class="b">免押金租借</text>
			<text class="s">（微信支付分550分以上有机会）</text>
		</view>
		<view class="check-agreement">
			<checkbox-group @change="changed"><checkbox class="check" value="1"></checkbox></checkbox-group>
			同意
			<text class="agreement">《委托扣款授权书》</text>
		</view>
	</view>
</template>

<script>
import { get, post } from '../../libs/request.js';
export default {
	data() {
		return {
			checked: []
		};
	},
	methods: {
		changed(e) {
			this.checked = e.detail.value;
		},
		submit(e) {
			let sn = '88c12dc1c96f4ed1846454691ad74e77';
			// if(this.checked.length > 0){
			// #ifdef MP-WEIXIN
			this.getWechart(sn);
			// #endif
			// #ifdef MP-ALIPAY
			this.getAliPay(sn);
			// #endif
			// uni.reLaunch({
			//     url: 'loanSuccess'
			// });
			// } else {
			// 	uni.showToast({
			// 		title:'请勾选协议'
			// 	});
			// }
		},
		getWechart(sn) {
			let _this = this;
			post('wxpay/payscore', {
				sn: sn
			}).then(res => {
				console.info('step1',res.data)
				if (res.code === 200) {
					wx.openBusinessView({
						businessType: 'wxpayScoreUse',
						extraData: {
							mch_id: res.data.mchId,
							package: res.data.packageInfo,
							timestamp: res.data.timestamp,
							nonce_str: res.data.nonceStr,
							sign_type: res.data.signType,
							sign: res.data.sign
						},
						success() {
							//dosomething
							console.info('step2')
							wx.navigateToMiniProgram({
								appId: 'wxd8f3793ea3b935b8',
								path: 'pages/use/use',
								extraData: {
									mch_id: res.data.mchId,
									package: res.data.packageInfo,
									timestamp: res.data.timestamp,
									nonce_str: res.data.nonceStr,
									sign_type: res.data.signType,
									sign: res.data.sign
								},
								success() {
									console.info('step3')
									
								},
								fail() {
									//dosomething
								},
								complete() {
									//dosomething
									console.info('complete')
									uni.navigateTo({
										url: `loaning?orderNum=${res.data.orderNum}`,
									});
								}
							});
						},
						fail() {
							//dosomething
							console.info('失败');
						},
						complete() {
							//dosomething
							console.info('complete1')
							uni.navigateTo({
								url: "index"
							});
						}
					});
				}
			});
		},
		getAliPay(sn) {
			post('/wxpay/freeze', {
				sn: sn
			}).then(res => {
				if(res.code === 200){
					// #ifdef MP-ALIPAY
					my.tradePay({
					  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
					  orderStr: res.data.orderStr'
					  success: (res) => {
					    my.alert({
					      content: JSON.stringify(res),
					    });
					  },
					  fail: (res) => {
					    my.alert({
					      content: JSON.stringify(res),
					    });
					  }
					});
					// #endif
				}
			});
		},
	}
};
</script>

<style lang="scss">
.loan-content {
	padding: 30rpx;
	box-sizing: border-box;
	.studus-img {
		width: 428rpx;
		height: 350rpx;
		margin: 60rpx auto 40rpx auto;
		display: block;
	}
	.tips {
		font-size: 28rpx;
		color: #333333;
		text-align: center;
		display: block;
	}
	.rule {
		margin-top: 80rpx;
		.title {
			font-size: 28rpx;
			color: #333333;
		}
		.item {
			font-size: 26rpx;
			color: #777777;
			line-height: 48rpx;
			.num {
				color: #22a6f1;
			}
		}
	}
	.submit {
		height: 90rpx;
		margin: 70rpx 0 0 0;
		background: #22a6f1;
		color: #ffffff;
		border-radius: 90rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.b {
			font-size: 30rpx;
		}
		.s {
			font-size: 24rpx;
		}
	}
	.check-agreement {
		margin-top: 20rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		color: #333333;
		align-items: center;
		.check {
			width: 30rpx;
			height: 30rpx;
			position: relative;
			margin-right: 10rpx;
			.wx-checkbox-input {
				width: 30rpx;
				height: 30rpx;
				// box-sizing: border-box;
				// position: absolute;
				// top: 0;
			}
		}
		.agreement {
			color: #22a6f1;
		}
	}
}
</style>
