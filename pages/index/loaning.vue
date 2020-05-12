<template>
	<view class="order-loaning">
		<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/loaning.gif" class="loading"></image>
		<text class="text">正在弹出充电宝，请稍等...</text>
	</view>
</template>

<script>
	import { get,post } from "../../libs/request.js"
	export default {
		data() {
			return {
				timer:null
			}
		},
		onLoad(res){
			let _this = this;
			let orderNum = res.orderNum;
			console.log('orderNum',orderNum)
			if(orderNum){
				setInterval(function(){
					_this.checkOrder(orderNum);
				},1000);
			}
		},
		methods: {
			checkOrder(orderNum){
				if(this.timer){
					clearInterval(this.timer);
				}
				let status = {
					"-2":"订单不存在",
					"-1":"设备未上传",
					"1":"失败"
				}
				get(`/order/status/${orderNum}`).then(res=>{
					if(res.code === 200){
						if(res.data.status === 0){
							uni.navigateTo({
								url: "loanSuccess"
							});
						} else if(res.data.status === 1) {
							uni.navigateTo({
								url: "index"
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
