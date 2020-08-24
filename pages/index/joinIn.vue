<template>
	<view class="joinin-content">
		<template v-if="step === 1">
			<view class="form">
				<view class="item">
					<input type="number" v-model="mobile" class="ui-input" placeholder="请输入联系电话" />
				</view>
				<view class="item">
					<input type="number" v-model="code" class="ui-input" placeholder="请输入验证码" maxlength="6"/>
					<view class="get-code" @click="getCode" v-if="count===60">获取验证码</view>
					<view class="get-code" v-else>{{count}}</view>
				</view>
				<view class="submit" @click="next">下一步</view>
			</view>
		</template>
		<template v-if="step === 2">
			<view class="form">
				<view class="item">
					<input type="text" v-model="joinData.name" class="ui-input" placeholder="请输入联系人" />
				</view>
				<view class="item">
					<input type="text" class="ui-input" v-model="joinData.record" placeholder="所在城市/区域" disabled @click="openPicker"/>
					<image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-more.png" class="get-code icon-more"></image>
				</view>
				<view class="item">
					<input type="text" v-model="joinData.shopName" class="ui-input" placeholder="请输入店铺名称或地址" />
				</view>
				<!-- <view class="item">
					<view class="about">关于我们</view>
					<image src="../../static/logo.png" class="qrcode"></image>
				</view> -->
				<view class="submit" @click="joinUs">提交</view>
			</view>
		</template>
		<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
		<view class="layer" v-if="msg">
			<view class="box">
				<view class="item">
					<input type="number" v-model="msgCode" class="ui-input" placeholder="请输入验证码" maxlength="4"/>
					<image @click="refreshImg" :src="url" class="get-msgcode"></image>
				</view>
				<view class="submit" @click="getImgForCode">获取短信验证码</view>
				<view class="submit" @click="msg = false">取消</view>
			</view>
		</view>
	</view>
</template>

<script>
import {BASE_URL} from "../../config/index.js"
import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
import { get, post } from '../../libs/request.js';
export default {
	data() {
		return {
			url:null,
			joinData: {
				shopName:"",
				name:"",
				record:""
			},
			lotusAddressData:{
				visible:false,
				provinceName:'',
				cityName:'',
				townName:'',
			},
			mobile:"",
			code:"",
			region:"",
			step: 1,
			timer:null, // 计时器
			count:60,
			msg: false,
			msgImg:null,
			msgCode:null, //图文验证码
		};
	},
	components:{
		lotusAddress
	},
	onHide(){
		clearInterval(this.timer)
	},
	methods: {
		countDown(){
			let _this = this
			_this.timer = setInterval(function(){
				if(_this.count > 0){
					_this.count --
				} else {
					_this.count = 60
					clearInterval(_this.timer)
				}
			},1000)
		},
		joinUs() {
			if(!this.joinData.shopName || !this.joinData.shopName || !this.joinData.shopName) {
				return uni.showToast({
					icon:"none",
					title:"信息不完善"
				})
			}
			post('/user/joinus', this.joinData).then(res => {
				if (res.code === 200) {
					uni.showToast({
						title:"信息提交成功",
						icon:"none"
					})
					uni.navigateTo({
						url:"userInfo"
					})
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
		},
		refreshImg(){
			var time = Math.random() 
			this.url = `${BASE_URL}/user/authcode.html?mobile=${this.mobile}&time=${time}`
		},
		getCode(){
			let _this = this
			if(!this.mobile) return false;
			post('/user/send/sms/code',{
				mobile: this.mobile
			}).then(res => {
				if (res.code === 200) {
				console.log(res.data)
					if(res.data){
						_this.refreshImg()
						_this.msg = true
					} else {
						_this.countDown()
						uni.showToast({
							title:"验证码发送成功",
							icon:"success"
						})
					}
					
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
		},
		// 图文验证码方式下发验证码
		getImgForCode(){
			if(!this.mobile || !this.msgCode) return false;
			post('/user/validate-code',{
				mobile: this.mobile,
				code:this.msgCode
			}).then(res => {
				if (res.code === 200) {
					this.getCode()
					this.msg = false
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
		},
		next(){
			if(!this.mobile || !this.code) return false;
			post('/user/send/sms/code',{
				mobile: this.mobile,
				code:this.code
			}).then(res => {
				if (res.code === 200) {
					this.step = 2
				} else {
					uni.showToast({
						title:res.msg,
						icon:"none"
					})
				}
			});
		},
		openPicker() {
			this.lotusAddressData.visible = true;
			this.lotusAddressData.provinceName = '广东省';
			this.lotusAddressData.cityName = '广州市';
			this.lotusAddressData.townName = '白云区';
		},
		//回传已选的省市区的值
		choseValue(res){
			//res数据源包括已选省市区与省市区code
			console.log(res);
			this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			//res.isChose = 1省市区已选 res.isChose = 0;未选
			if(res.isChose){
				this.lotusAddressData.provinceName = res.province;//省
				this.lotusAddressData.cityName = res.city;//市
				this.lotusAddressData.townName = res.town;//区
				this.joinData.record = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值
			}
		}
	}
};
</script>

<style lang="scss">
@import url('../../assets/scss/icon.scss');
.joinin-content {
	.form {
		box-sizing: border-box;
		padding: 30rpx;
		.item{
			position: relative;
			.get-code{
				position: absolute;
				right: 30rpx;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 24rpx;
				color: #FFC600;
				top: 50%;
				transform: translateY(-50%);
				z-index: 100;
			}
			
			.icon-more{
				width: 11rpx;
				height: 18rpx;
			}
			.about{
				text-align: center;
				font-size: 28rpx;
				color: #333333;
			}
			.qrcode{
				width: 150rpx;
				height: 150rpx;
				margin: 0 auto;
				display: block;
				margin-top: 20rpx;
			}
		}
		.ui-input,
		.ui-textarea {
			height: 90rpx;
			line-height: 90rpx;
			padding-left: 20rpx;
			font-size: 28rpx;
			border-radius: 10rpx;
			background: #f2f4f6;
			margin-bottom: 20rpx;
			display: block;
		}
		.submit {
			height: 90rpx;
			border-radius: 90rpx;
			background: #303030;
			color: #FFDD00;
			font-size: 30rpx;
			text-align: center;
			line-height: 90rpx;
			margin-top: 40rpx;
		}
	}
	.layer{
		position: fixed;
		width: 100%;
		height: 100%;
		background: rgba($color: #000000, $alpha: 0.8);
		top: 0;
		left: 0;
		.box{
			width: 600rpx;
			box-sizing: border-box;
			background: #FFFFFF;
			border-radius: 10rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			padding: 30rpx;
			display: flex;
			flex-direction: column;
			.item{
				position: relative;
				.ui-input{
					width: 100%;
					height: 80rpx;
					border-bottom: 2rpx solid #dedede;
				}
				.get-msgcode{
					width: 120rpx;
					height: 60rpx;
					position: absolute;
					right: 0rpx;
					top: 50%;
					transform: translateY(-50%);
					z-index: 100;
				}
			}
			.submit {
				height: 90rpx;
				border-radius: 90rpx;
				background: #303030;
				color: #FFDD00;
				font-size: 30rpx;
				text-align: center;
				line-height: 90rpx;
				margin-top: 40rpx;
			}
		}
	}
}
</style>
