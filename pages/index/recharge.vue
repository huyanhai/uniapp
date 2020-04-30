<template>
	<view class="balance-content">
		<view class="balance-box">
			<text class="label">
				充值金额
			</text>
			<view class="form">
				<radio-group @change="changed" class="group">
						<label class="ui-radio" :class="{active:item.checked}" v-for="(item,index) in items" :key="index">
							<radio :value="item.value" :checked="item.checked"/>
							<text class="text">{{item.name}}</text>
						</label>
				</radio-group>
			</view>
		</view>
		<view class="operation">
			<view class="recharge" @click="recharge">确认充值</view>
		</view>
		<text class="history" @click="goHistory">提现记录 >></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items:[
					{
						value:"5",
						name:"5",
						checked:true
					},
					{
						value:"10",
						name:"10",
						checked:false
					},
					{
						value:"20",
						name:"10",
						checked:false
					},{
						value:"30",
						name:"30",
						checked:false
					},
					{
						value:"40",
						name:"40",
						checked:false
					},
					{
						value:"50",
						name:"50",
						checked:false
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
		margin: 0 30rpx;
	}
	.label{
		font-size: 28rpx;
		color: #333333;
		width: 100%;
		text-align: center;
		margin-top: 70rpx;
	}
	.form{
		.group{
			display: flex;
			flex-wrap: wrap;
		}
		.ui-radio{
			border: 1px solid #F2F4F6;
			background: #F2F4F6;
			border-radius: 8rpx;
			width: calc((100% - 80rpx)/3);
			height: 90rpx;
			text-align: center;
			white-space:nowrap;
			font-size: 26rpx;
			line-height: 90rpx;
			margin-top: 30rpx;
			margin-right: 40rpx;
			box-sizing: border-box;
			&:nth-child(3n + 3){
				margin-right: 0;
			}
			.text{
				color:#22A6F1;
				font-size: 26rpx;
			}
			&.active{
			  border: 1px solid #22A6F1;
			  background: #22A6F1;
			  border-radius: 8rpx;
			  width: calc((100% - 80rpx)/3);
			  height: 90rpx;
			  text-align: center;
			  white-space:nowrap;
			  font-size: 26rpx;
			  line-height: 90rpx;
			  box-sizing: border-box;
			  .text{
			    color:#fff;
			    font-size: 26rpx;
			  }
			}
		}
		radio {
		  display: none;
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
