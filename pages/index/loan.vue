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
				<text class="num">{{tips.hourMoney}}元/小时</text>。
				租借{{tips.freeTime}}分钟内免费，日封顶{{tips.dayMoney}}元，总封顶99元。 \n押金99.00元，支持免押服务。
			</text>
		</view>
		<view class="submit" @click="submit">
			<text class="b">免押金租借</text>
			<!-- #ifdef MP-WEIXIN -->
			<text class="s">（微信支付分550分以上有机会）</text>
			<!-- #endif -->
			<!-- #ifdef MP-ALIPAY -->
			<text class="s">（芝麻分550分以上有机会）</text>
			<!-- #endif -->
		</view>
		<view class="check-agreement">
			<checkbox-group @change="changed"><checkbox class="check" value="1" checked="checked"></checkbox></checkbox-group>
			同意
			<text class="agreement" @click="toAgreement">《委托扣款授权书》</text>
		</view>
	</view>
</template>

<script>
import { get, post } from '../../libs/request.js';
export default {
	data() {
		return {
			checked: [1],
			tips:"",
			sn:"",
			orders:null
		};
	},
	onLoad(e){
		this.sn = e.sn;
		this.getOrderTips(this.sn);
	},
	onShow(){
		this.getUserOrder({
			leaseStatus: 2
		});
	},
	methods: {
		changed(e) {
			this.checked = e.detail.value;
		},
		toAgreement(){
			uni.navigateTo({
				url: `agreement`,
			});
		},
		getUserOrder(data) {
			// 获取用户订单
			post('order/list', data).then(res => {
				if (res.code === 200) {
					this.orders = res.data;
				}
			});
		},
		submit(e) {
			let sn = this.sn;
			if(this.checked.length > 0){
				if(this.orders && this.orders.length > 0){
					return uni.showToast({
						title:"存在租借中的订单",
						icon:"none"
					})
				} else {
					// #ifdef MP-WEIXIN
					this.getWechart(sn);
					// #endif
					// #ifdef MP-ALIPAY
					this.getAliPay(sn);
					// #endif
		}
			} else {
				uni.showToast({
					title:'请勾选协议'
				});
			}
		},
		getWechart(sn) {
			let _this = this;
			post('wxpay/payscore', {
				sn: sn
			}).then(res => {
				console.info('step1',res.data);
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
									uni.navigateTo({
										url: `loaning?orderNum=${res.data.orderNum}`,
									});
								},
								fail(result) {},
								complete() {
									//dosomething
									uni.navigateTo({
										url: `loaning?orderNum=${res.data.orderNum}`,
									});
								}
							});
						},
						fail(err) {
							//dosomething
							uni.showModal({
							    title: '提示',
							    content: '获取免押失败，是否交押金使用？',
								confirmText:"确定",
								cancelText:"取消",
							    success: function (res) {
							        if (res.confirm) {
							            _this.payWechart(sn);
							        } else if (res.cancel) {
										uni.navigateTo({
											url: "index"
										});
							        }
							    }
							});
							
						},
						complete() {
							//dosomething
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
					console.log('orderStr',res.data.orderStr)
					my.tradePay({
					  // 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
					  orderStr: res.data.orderStr,
					  success: (rs) => {
						  console.log('授权成功',res.data.orderNum)
						  uni.navigateTo({
						  	url: `loaning?orderNum=${res.data.orderNum}`,
						  });
					  },
					  fail: (res) => {
						  console.log('授权失败',res)
					    uni.showToast({
					    	title:'授权失败'
					    })
						uni.navigateTo({
							url: "index"
						});
					  }
					});
					// #endif
				}
			});
		},
		payWechart(sn){
			post('/wxpay/prepay', {
				sn: sn
			}).then(res => {
				wx.requestPayment({
				  timeStamp: res.data.timeStamp,
				  nonceStr: res.data.nonceStr,
				  package: res.data.package,
				  signType: res.data.signType,
				  paySign: res.data.paySign,
				  success () {
					  uni.navigateTo({
					  	url: `loaning?orderNum=${res.data.orderNum}`,
					  });
				  },
				  fail (res) { 
					  uni.navigateTo({
					  	url: "index"
					  });
				  }
				})
			})
		},
		getOrderTips(sn){
			post('/order/bill', {
				sn: sn
			}).then(res => {
				this.tips = res.data;
			})
			
		}
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
			margin-right: 20rpx;
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
