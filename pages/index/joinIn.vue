<template>
	<view class="joinin-content">
		<view class="top-bg line-color">
			<text class="title">合作加盟</text>
			<text class="tips">愿与您合作共赢，共创未来无限可能</text>
		</view>
		<view class="form">
			<input type="text" v-model="joinData.shopName" class="ui-input" placeholder="请输入店铺名称" />
			<input type="text" class="ui-input" v-model="joinData.name" placeholder="请输入联系人" />
			<input type="text" class="ui-input" v-model="joinData.phone" placeholder="请输入联系电话" />
			<textarea class="ui-textarea" v-model="joinData.remarks" placeholder="请输入您要合作的信息"></textarea>
			<view class="submit" @click="joinUs">提交</view>
		</view>
	</view>
</template>

<script>
import { get, post } from '../../libs/request.js';
export default {
	data() {
		return {
			joinData: {
				shopName:"",
				name:"",
				phone:"",
				remarks:""
			}
		};
	},
	methods: {
		joinUs() {
			post('/user/joinus', this.joinData).then(res => {
				if (res.code === 200) {
					uni.showToast({
						title:"信息提交成功",
						icon:"none"
					})
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import url('../../assets/scss/icon.scss');
.joinin-content {
	.top-bg {
		width: 750rpx;
		height: 369rpx;
		position: relative;
		padding-left: 30rpx;
		background: url('http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/joinbg.png') no-repeat;
		background-size: cover;
		.title {
			font-size: 32rpx;
			color: #ffffff;
			bottom: 70rpx;
			position: absolute;
		}
		.tips {
			font-size: 28rpx;
			color: #ffffff;
			bottom: 25rpx;
			position: absolute;
		}
	}
	.form {
		box-sizing: border-box;
		padding: 30rpx;
		.ui-input,
		.ui-textarea {
			height: 90rpx;
			line-height: 90rpx;
			padding-left: 20rpx;
			font-size: 28rpx;
			border-radius: 4rpx;
			background: #f2f4f6;
			margin-bottom: 20rpx;
			display: block;
		}
		.ui-textarea {
			width: 100%;
			box-sizing: border-box;
			height: 260rpx;
			padding-top: 30rpx;
		}
		.submit {
			height: 90rpx;
			border-radius: 90rpx;
			background: #22a6f1;
			color: #ffffff;
			font-size: 30rpx;
			text-align: center;
			line-height: 90rpx;
			margin-top: 40rpx;
		}
	}
}
</style>
