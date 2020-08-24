<template>
	<view class="question-content">
		<input class="ui-input" v-model="feedback.deviceId" placeholder="请输入设备编号" />
		<view class="category">
			<text class="label">分类标签</text>
			<view class="item-box">
				<radio-group @change="changed" class="group">
					<label class="ui-radio" :class="{active:item.checked}" v-for="(item,index) in items" :key="index">
						<radio :value="item.value" :checked="item.checked"/>
						<text class="text">{{item.name}}</text>
					</label>
				</radio-group>
			</view>
		</view>
		<view class="upload-img">
			<text class="label">我要反馈</text>
			<view class="form">
				<textarea class="textarea" v-model="feedback.content" placeholder="请输入问题或意见"></textarea>
				<view class="lists">
					<view class="upload" @click="uploadImg"></view>
					<view class="list" v-for="(item,index) in imgList" :key="index">
						<icon class="close" @click="delImg(index)"></icon>
						<image :src="item" class="img"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="call-us">
			<text class="label">联系方式</text>
			<input class="ui-input" v-model="feedback.phone" placeholder="请输入联系电话" type="number" />
		</view>
		<view class="submit" @click="feedbackFn">提交</view>
	</view>
</template>

<script>
	import { get, post } from '../../libs/request.js';
	
	import {BASE_URL} from "../../config/index.js"
	export default {
		data() {
			return {
				items:[
					{
						value:"1",
						name:"充不了电",
						checked:true
					},
					{
						value:"2",
						name:"功能问题",
						checked:false
					},
					{
						value:"3",
						name:"机柜问题",
						checked:false
					},{
						value:"4",
						name:"客户问题",
						checked:false
					},
					{
						value:"5",
						name:"订单问题",
						checked:false
					},
					{
						value:"6",
						name:"其他问题",
						checked:false
					}
				],
				imgList:[],
				feedback:{
					type:"1"
				}
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
				this.feedback.type = data;
			},
			uploadImg(){
				let that = this;
				let authCode = String(uni.getStorageSync("authCode"))
				uni.chooseImage({
				    count: 6, //默认9
				    sizeType: ['copressed'], //可以指定是原图还是压缩图，默认二者都有
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
						let img = res.tempFilePaths[0];
						uni.uploadFile({
							url: BASE_URL + "commonn/upload",
							header:{
								authCode:authCode
							},
							filePath: img,
							name: 'file',
							success: function (uploadFileRes) {
								let data = JSON.parse(uploadFileRes.data)
								console.log(data.code)
							    if(data.code === 200){
									that.imgList.push(data.data);
								}
							}
						})
				    }
				});
			},
			delImg(index) {
				this.imgList.splice(index,1);
			},
			feedbackFn() {
				if(!this.feedback.deviceId || !this.feedback.phone || !this.feedback.content){
					return uni.showToast({
						title:"设备编号、备注或手机号为空",
						icon:"none"
					})
				}
				let myreg = /^[1][2,3,4,5,6,7,8,9][0-9]{9}$/;
				console.log(myreg.test(this.feedback.phone))
				if(!myreg.test(this.feedback.phone)){
					return uni.showToast({
						title:"手机号格式错误",
						icon:"none"
					})
				}
				this.feedback['type'] = Number(this.feedback['type']);
				let data = Object.assign({attachment:""},this.feedback);
				for(let item of this.imgList){
					data['attachment'] += item +','
				}
				post('user/feedback', data).then(res => {
					if (res.code === 200) {
						uni.showToast({
							title:"信息提交成功",
							icon:"none"
						})
						uni.navigateBack()
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.question-content{
	box-sizing: border-box;
	padding: 30rpx;
	.ui-input{
		height: 90rpx;
		line-height: 90rpx;
		background: #F2F4F6;
		border-radius: 4rpx;
		font-size: 28rpx;
		color: #333333;
		padding-left: 20rpx;
		display: block;
	}
	.category{
		margin-top: 40rpx;
		.label{
			font-size: 28rpx;
			color: #333333;
		}
		.item-box{
			.group{
				display: flex;
				flex-wrap: wrap;
			}
			.ui-radio{
				border: 1px solid #FFF5C6;
				background: #FFF5C6;
				border-radius: 60rpx;
				width: calc((100% - 80rpx)/3);
				height: 60rpx;
				text-align: center;
				white-space:nowrap;
				font-size: 26rpx;
				line-height: 60rpx;
				margin-top: 30rpx;
				margin-right: 40rpx;
				box-sizing: border-box;
				&:nth-child(3n + 3){
					margin-right: 0;
				}
				.text{
					color:#333333;
					font-size: 26rpx;
				}
				&.active{
				  border: 1px solid #303030;
				  background: #303030;
				  border-radius: 60rpx;
				  width: calc((100% - 80rpx)/3);
				  height: 60rpx;
				  text-align: center;
				  white-space:nowrap;
				  font-size: 26rpx;
				  line-height: 60rpx;
				  box-sizing: border-box;
				  .text{
				    color:#FFDD00;
				    font-size: 26rpx;
				  }
				}
			}
			radio {
			  display: none;
			}
		}
	}
	.upload-img{
		margin-top: 40rpx;
		.label{
			font-size: 28rpx;
			color: #333333;
		}
		.form{
			margin-top: 10rpx;
			.textarea{
				background: #F2F4F6;
				height: 260rpx;
				font-size: 28rpx;
				color: #333333;
				width: 100%;
				border-radius: 4rpx;
				box-sizing: border-box;
				padding: 20rpx;
			}
			.lists{
				display: flex;
				flex-wrap: wrap;
				margin-top: 20rpx;
				.upload{
					width: 134rpx;
					height: 100rpx;
					border-radius: 8rpx;
					box-sizing: border-box;
					background: #F2F4F6;
					border:2rpx dashed #D7D7D7;
					background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-photo.png") no-repeat center center;
					background-size:61rpx 46rpx;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
				}
				.list{
					width: 134rpx;
					height: 100rpx;
					border-radius: 8rpx;
					position: relative;
					margin-right: 30rpx;
					margin-bottom: 30rpx;
					.img{
						width: 100%;
						height: 100%;
					}
					.close{
						width: 28rpx;
						height: 28rpx;
						background: red;
						position: absolute;
						right: -10rpx;
						top: -10rpx;
						border-radius: 28rpx;
						background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-txsb.png") no-repeat;
						background-size: cover;
					}
				}
			}
		}
	}
	.call-us{
		margin-top: 40rpx;
		.label{
			font-size: 28rpx;
			color: #333333;
			margin-bottom: 20rpx;
			display: block;
		}
	}	
	.submit{
		height: 90rpx;
		border-radius: 90rpx;
		background: #303030;
		color: #FFDD00;
		font-size: 32rpx;
		text-align: center;
		line-height: 90rpx;
		margin-top: 40rpx;
	}
}
</style>
