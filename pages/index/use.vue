<template>
	<view class="use-zn">
		<view class="use-hd">
			<view class="item" :class="{active:active === index + 1}" v-for="(item,index) in tab" :key="index" @click="changeItem(index)">{{item.name}}</view>
		</view>
		<view class="use-bd">
			<template v-if="active === 1">
				<view class="rhsy">
					<view class="item">
						<view class="title">技巧一<text class="text">SKILL ONE</text></view>
						<view class="tips">从图示处抽出充电线，请不要使用太大力气哦</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step1.png" class="img"></image>
					</view>
					<view class="item">
						<view class="title">技巧二<text class="text">SKILL TWO</text></view>
						<view class="tips">点击方形按钮开启充电宝，充电宝的指示灯为当前剩余电量提示</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step2.png" class="img"></image>
					</view>
					<view class="item">
						<view class="title">技巧三<text class="text">SKILL THREE</text></view>
						<view class="tips">可将线反向折叠更便于充电</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step3.png" class="img"></image>
					</view>
				</view>
			</template>
			<template v-if="active === 2">
				<view class="rhzj">
					<view class="item">
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/rhzj1.png" class="img"></image>
					</view>
					<view class="item">
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/rhzj2.png" class="img"></image>
					</view>
					<view class="item">
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/rhzj3.png" class="img"></image>
					</view>
				</view>
			</template>
			<template v-if="active === 3">
				<view class="rhsy">
					<view class="item">
						<view class="title">技巧一<text class="text">SKILL ONE</text></view>
						<view class="tips">从图示处抽出充电线，请不要使用太大力气哦</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step1.png" class="img"></image>
					</view>
					<view class="item">
						<view class="title">技巧二<text class="text">SKILL TWO</text></view>
						<view class="tips">点击方形按钮开启充电宝，充电宝的指示灯为当前剩余电量提示</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step2.png" class="img"></image>
					</view>
					<view class="item">
						<view class="title">技巧三<text class="text">SKILL THREE</text></view>
						<view class="tips">可将线反向折叠更便于充电</view>
						<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/1step3.png" class="img"></image>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab:[
					{
						name:'如何使用',
					},
					{
						name:'如何租借',
					},
					{
						name:'如何归还',
					}
				],
				active: 1
			};
		},
		methods:{
			changeItem(index){
				this.active = index + 1;
			}
		}
	}
</script>

<style lang="scss">
.use-zn{
	height: 100vh;
	display: flex;
	flex-direction: column;
	background: #FFFFFF;
	.use-hd{
		height: 80rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex: 0 0 auto;
		padding: 0 40rpx;
		position: fixed;
		width: 100%;
		box-sizing: border-box;
		background: #FFFFFF;
		z-index: 100;
		.item{
			text-align: center;
			font-size: 32rpx;
			color: #333333;
			position: relative;
			height: 80rpx;
			&.active{
				font-weight: bold;
				&::before{
					content: "";
					width: 50rpx;
					height: 4rpx;
					background: #FFDD00;
					position: absolute;
					bottom: 0;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
	.use-bd{
		height: 100%;
		flex: 1 0 auto;
		padding-top: 120rpx;
		box-sizing: border-box;
		.rhsy{
			padding: 0 40rpx;
			.item{
				margin-bottom: 30rpx;
				.title{
					display: flex;
					font-size: 32rpx;
					color: #333333;
					.text{
						font-size: 32rpx;
						color: #DFDFDF;
						margin-left: 20rpx;
					}
				}
				.tips{
					font-size: 24rpx;
					color: #333333;
					margin: 20rpx 0;
				}
				.img{
					width: 100%;
					height: 300rpx;
					border-radius: 10rpx;
					overflow: hidden;
				}
			}
		}
		.rhzj{
			.item{
				margin-bottom: 30rpx;
				.img{
					width: 100%;
					height: 300rpx;
					overflow: hidden;
					display: block;
				}
			}
		}
	}
}
</style>
