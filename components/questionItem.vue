<template>
	<view class="items" :class="{active:active}">
		<view class="tips" @click="change">{{question.title}}</view>
		<view class="contents" v-if="active">{{question.text}}</view>
	</view>
</template>

<script>
	export default {
		props:{
			question:{
				type:Object
			}
		},
		data() {
			return {
				active:false
			};
		},
		methods:{
			change(){
				console.log("----")
				this.active = !this.active;
			}
		}
	}
</script>

<style lang="scss">
.items{
	&.active{
		.tips{
			&::after{
				transform: translateY(-50%) rotate(0deg);
			}
		}
	}
	.tips{
		height: 80rpx;
		line-height: 80rpx;
		color: #666666;
		font-size: 28rpx;
		position: relative;
		&::after{
			background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/dowm.png") no-repeat;
			width: 26rpx;
			height: 15rpx;
			background-size: cover;
			content: "";
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%) rotate(180deg);
		}
	}
	.contents{
		font-size: 24rpx;
		color: #999999;
	}
}
</style>
