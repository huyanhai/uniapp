<template>
	<view class="order-loaning">
		<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/loaning.png" class="loading"></image>
		<text class="text">正在弹出充电宝，请稍等...</text>
	</view>
</template>

<script>
	import { get,post } from "../../libs/request.js"
	export default {
		data() {
			return {
				timer:null,
				time:0
			}
		},
		onLoad(res){
			let _this = this;
			let orderNum = res.orderNum;
			if(orderNum){
				_this.timer = setInterval(function(){
					console.log("time",_this.time)
					if(_this.time >= 20){
						clearInterval(_this.timer);
						uni.navigateTo({
							url: "loanFail"
						});
					} else {
						_this.time ++;
						_this.checkOrder(orderNum);
					}
				}, 3000);
			}
		},
		onHide(){
			this.time = 0
			clearInterval(this.timer)
		},
		methods: {
			checkOrder(orderNum){
				let _this = this;
				let status = {
					"-2":"订单不存在",
					"-1":"设备未上传",
					"1":"失败"
				}
				get(`/order/status/${orderNum}`).then(res=>{
					console.log(res.data.cardSlot,res.data.number)
					if(res.code === 200){
						if(res.data.status === 0){
							uni.navigateTo({
								url: `loanSuccess?orderNum=${orderNum}&cardSlot=${res.data.cardSlot}&number=${res.data.number}`
							});
						} else if(res.data.status === 1) {
							uni.navigateTo({
								url: "loanFail"
							});
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.order-loaning{
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.loading{
			width: 428rpx;
			height: 364rpx;
			margin: 82rpx 0 36rpx 0;
		}
		.text{
			font-size: 26rpx;
			color: #333333;
		}
	}
</style>
