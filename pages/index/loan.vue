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
		<view class="top-title">自带<text class="yellow">三线</text>快充</view>
		<view class="top-types">
			<view class="item">安卓线</view>
			<view class="item">苹果线</view>
			<view class="item">Type-c线</view>
		</view>
		<image class="studus-img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-zjtips.png"></image>
		<view class="rule">
			<view class="title">计费规则：</view>
			<text class="item">
				<text class="num" v-if="tips.cycle === 1">{{tips.hourMoney/2}}元/半小时</text>
				<text class="num" v-if="tips.cycle === 2">{{tips.hourMoney}}元/小时</text>。
				租借{{tips.freeTime}}分钟内免费，日封顶{{tips.dayMoney}}元，总封顶99元。 \n押金99.00元，支持免押服务。
			</text>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="submit" @click="submit">
			<text class="b">免押金租借</text>
			<text class="s">（微信支付分550分以上有机会）</text>
		</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<form @submit="submit" report-submit="true">
		  <button type="primary" formType="submit" class="submit">
			  <text class="b" style="height: initial;">免押金租借</text>
		  </button>
		</form>
		<!-- #endif -->
		<view class="check-agreement">
			<checkbox-group @change="changed">
				<checkbox class="check" value="1" checked="checked"></checkbox>
			</checkbox-group>
			同意
			<text class="agreement" @click="toAgreement">《委托扣款授权书》</text>
		</view>
	</view>
</template>

<script>
	import {
		get,
		post
	} from '../../libs/request.js';
	export default {
		data() {
			return {
				checked: [1],
				tips: "",
				sn: "",
				orders: null
			};
		},
		onLoad(e) {
			this.sn = e.sn;
			this.getOrderTips(this.sn);
		},
		onShow() {
			this.getUserOrder({
				leaseStatus: 2
			});
		},
		methods: {
			changed(e) {
				this.checked = e.detail.value;
			},
			toAgreement() {
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
				// #ifdef MP-ALIPAY
				let formId = e.detail.formId || "";
				// #endif
				if (this.checked.length > 0) {
					// if (this.orders && this.orders.length > 0) {
					// 	return uni.showToast({
					// 		title: "存在租借中的订单",
					// 		icon: "none"
					// 	})
					// } else {
						
					// }
					// #ifdef MP-WEIXIN
					this.getWechart(sn);
					// #endif
					// #ifdef MP-ALIPAY
					this.getAliPay(sn,formId);
					// #endif
				} else {
					uni.showToast({
						title: '请勾选协议'
					});
				}
			},
			getWechart(sn) {
				let _this = this;
				wx.requestSubscribeMessage({
					tmplIds: ['mooj8JXCS7QA313DTeFdMLyo-KDpDfqVbv7z5_fix28', 'H0iqZpWig24QyDJYe-F4OaAGnWvEumBrY8glxtV8QcU'],
					success(res) {
						console.log('消息', res)
					},
					fail(err) {
						console.log('消息', err)
					},
					complete() {
						post('wxpay/payscore', {
							sn: sn
						}).then(res => {
							console.info('step1', res.data);
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
											confirmText: "确定",
											cancelText: "取消",
											success: function(res) {
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
							} else {
								uni.showToast({
									title: res.message
								});
							}
						});
					}
				})


			},
			getAliPay(sn,formId) {
				post('/wxpay/freeze', {
					sn: sn,
					formId:formId
				}).then(res => {
					if (res.code === 200) {
						// #ifdef MP-ALIPAY
						my.tradePay({
							// 调用统一收单交易创建接口（alipay.trade.create），获得返回字段支付宝交易号trade_no
							orderStr: res.data.orderStr,
							success: (rs) => {
								if (Number(rs.resultCode) === 9000) {
									uni.navigateTo({
										url: `loaning?orderNum=${res.data.orderNum}`,
									});
								} else {
									uni.showToast({
										title: '支付失败'
									})
								}
							},
							fail: (res) => {
								console.log('授权失败', res)
								uni.showToast({
									title: '授权失败'
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
			payWechart(sn) {
				post('/wxpay/prepay', {
					sn: sn
				}).then(res => {
					wx.requestPayment({
						timeStamp: res.data.timeStamp,
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: res.data.signType,
						paySign: res.data.paySign,
						success() {
							uni.navigateTo({
								url: `loaning?orderNum=${res.data.orderNum}`,
							});
						},
						fail(res) {
							uni.navigateTo({
								url: "index"
							});
						}
					})
				})
			},
			getOrderTips(sn) {
				post('/order/bill', {
					sn: sn
				}).then(res => {
					if(!res.data){
						return uni.redirectTo({
							url:"index"
						})
					}
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
		.top-title{
			font-size: 48rpx;
			color: #333333;
			margin-bottom: 50rpx;
			.yellow{
				color: #FFDD00;
			}
		}
		.top-types{
			display: flex;
			justify-content: space-between;
			padding: 0 50rpx;
			.item{
				border-radius: 10rpx;
				border: 2rpx solid #999999;
				font-size: 28rpx;
				color: #333333;
				height: 50rpx;
				line-height: 50rpx;
				padding: 0 30rpx;
			}
		}
		.studus-img {
			width: 491rpx;
			height: 355rpx;
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
			margin-top: 20rpx;
			box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.2);
			border-radius: 10rpx;
			box-sizing: border-box;
			padding: 20rpx;
			.title {
				font-size: 28rpx;
				color: #333333;
			}

			.item {
				font-size: 26rpx;
				color: #777777;
				line-height: 48rpx;

				.num {
					color: #FFC600;
				}
			}
		}

		.submit {
			height: 90rpx;
			margin: 70rpx 0 0 0;
			background: #303030;
			color: #FFDD00;
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
			.agreement {
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
