<template>
	<view class="content" disable-scroll="true">
		<view class="user-layer" v-if="!showSheet">
			<image :src="userInfo.headUrl" class="user-post" @click="goUser" />
			<view class="text">欢迎使用起电！</view>
			<button class="shop" @click="goNearShop">
				<view class="icon icon-shop"></view>
				附近商家
			</button>
		</view>
		<view class="task" v-if="orders.length > 0">
			<icon class="battery icon-battery" />
			<view class="info">
				<view class="top">{{ orders.length }}个订单租借中……</view>
				<view class="bottom">可归还至其他商家</view>
			</view>
			<button class="more" @click="goOrderDetails(orders[0])">查看详情</button>
		</view>
		<view class="option-scan" @click="scanCode">
			<view class="icon icon-scan"></view>
			扫一扫借用
		</view>
		<view class="right-option">
			<view class="location" @click="goLocation"><view class="icon-location"></view></view>
			<view class="call-me" @click="callMe"><view class="icon icon-call"></view></view>
		</view>
		<loginSheet :show="showSheet" @authSuccess="authSuccess" />
		<map
			class="map"
			id="map"
			:longitude="addressInfo.longitude"
			:latitude="addressInfo.latitude"
			scale="14"
			show-location="true"
			:markers="markers"
			style="height:100vh"
			@regionchange="regionchange"
			@markertap="makertap"
			@tap="hideShop"
			:scale="scale"
		/>
		<callUs :show.sync="showCallUs" />
		<cover-image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-lo.png" class="map-center"></cover-image>
		<view class="store-box"><shopItem :show="showShopItem" :item="shopItemData" :latitude.sync="addressInfo.latitude" :longitude.sync="addressInfo.longitude"/></view>
	</view>
</template>

<script>
import loginSheet from '../../components/loginSheet';
import shopItem from '../../components/shopItem';
import callUs from '../../components/callUs';
import { getLocation, getSetting } from '../../libs/auth.js';
import { scan } from '../../libs/utils';
import { get, post } from '../../libs/request.js';
export default {
	data() {
		return {
			markers: [],
			addressInfo: null,
			userInfo: null,
			shopItemData: {},
			showSheet: false,
			showShopItem: false,
			showCallUs: false,
			orders: {}, // 是否有租借中的订单
			outSn:"",
			scale:14
		};
	},
	// #ifdef MP-ALIPAY
	onLaunch(options){
		if (options.query && options.query.qrCode) {
		  let datas = options.query.qrCode;
		  if(datas && datas !== "undefined"){
		  	let code = datas.split('/');
		  	this.outSn = code[code.length - 1] || "";
		  }
		}		
	},
	// #endif
	// #ifdef MP-WEIXIN
	onLoad(e) {
		let datas = decodeURIComponent((e || {}).q);
		if(datas && datas !== "undefined"){
			let code = datas.split('/');
			this.outSn = code[code.length - 1] || "";
		}
	},
	// #endif
	onShow(){
		this.checkAuth();
	},
	onHide(){
		this.outSn = '';
	},
	components: {
		loginSheet,
		shopItem,
		callUs
	},
	methods: {
		async checkAuth() {
			let that = this;
			this.authCode = uni.getStorageSync('authCode');
			this.addressInfo = uni.getStorageSync('user_address') || null;
			console.log("this.addressInfo",this.addressInfo)
			if (!this.authCode) {
				that.showSheet = true;
			} else {
				if (this.addressInfo) {
					that.checkAddress();
					this.getUserInfo();
					this.getUserOrder({
						leaseStatus: 2
					});
				}
			}
			
		},
		async checkAddress() {
			let that = this;
			console.log('获取定位，每次执行')
			that.addressInfo = await getLocation();
			that.getNearDevice({
				lat: that.addressInfo['latitude'],
				lng: that.addressInfo['longitude'],
				range: 2000
			});
		},
		authSuccess(e) {
			this.authCode = uni.getStorageSync('authCode') || null;
			this.showSheet = false;
			if (this.authCode) {
				this.checkAddress();
				this.getUserInfo();
				this.getUserOrder({
					leaseStatus: 2
				});
			}
		},
		getUserInfo(){
			get('/login/info').then(res => {
				if(res.code === 200){
					this.userInfo = res.data
				}
			});
		},
		makertap(e) {
			console.log(e);
			let id = e.markerId;
			post('shop/detail', {
				sid: id,
				lat: this.addressInfo['latitude'],
				lng: this.addressInfo['longitude'],
			}).then(res => {
				if (res.code === 200) {
					let data = res.data;
					this.shopItemData = data;
					this.showShopItem = true;
				} else {
					uni.showToast({
						title: res.msg,
						icon:"none"
					})
				}
			});
		},
		goLocation(e) {
			// 回到自己的位置
			let content = uni.createMapContext('map', this);
			content.moveToLocation();
		},
		callMe() {
			// 联系客服
			this.showCallUs = true;
		},
		async scanCode() {
			if (this.orders.length > 0) {
				return uni.showToast({
					title: '存在租借中的订单',
					icon: 'none'
				});
			}
			let data = await scan();
			// 扫码
			if (data.result) {
				// 扫码成功后跳转
				let no = data.result;
				let code = no.split('/');
				let sn = code[code.length - 1];
				if (!sn)
					return uni.showToast({
						title: '二维码格式错误',
						icon: 'none'
					});
				uni.navigateTo({
					url: 'loan?sn=' + sn
				});
			}
		},
		hideShop() {
			this.showShopItem = false;
		},
		regionchange(e) {
			let that = this;
			console.log(e.scale,e)
			if (e.type === 'end' && e.causedBy === 'drag') {
				that.scale = e.scale;
				let content = uni.createMapContext('map', this);
				content.getCenterLocation({
					success(res) {
						that.addressInfo['latitude'] = res['latitude'];
						that.addressInfo['longitude'] = res['longitude'];
						that.getNearDevice({
							lat: that.addressInfo['latitude'],
							lng: that.addressInfo['longitude'],
							range: 2000
						});
						console.log('拖拽后的经纬度：' + res);
					},
					fail(err) {
						uni.showToast({
							title: '获取定位失败',
							icon: 'none'
						});
					}
				});
			}
		},
		goNearShop() {
			let latitude = this.addressInfo.latitude;
			let longitude = this.addressInfo.longitude;
			// 附件门店跳转
			uni.navigateTo({
				url: `nearShop?latitude=${latitude}&longitude=${longitude}`
			});
		},
		goUser() {
			if(this.userInfo){
				// 跳转个人界面
				uni.navigateTo({
					url: 'userInfo'
				});
			} else {
				this.checkAuth();
			}
		},
		goOrderDetails(e) {
			console.log(e)
			// 商户详情
			uni.navigateTo({
				url: `orderDetail?item=${JSON.stringify(e)}`
			});
		},
		getNearDevice(data) {
			// 获取附件的设备
			let that = this;
			post('shop/nearby', data).then(res => {
				console.log(res.msg)
				if (res.code === 200) {
					let data = res.data;
					if (data.length > 0) {
						that.markers = [];
						data.map((item, index) => {
							console.log(item.shopInfo['shopName'])
							that.markers.push({
								id: item.shopInfo['stringId'],
								iconPath: 'http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-maker.png',
								width: 30,
								height: 30,
								title: item.shopInfo['shopName'],
								latitude: item.shopInfo['latitude'],
								longitude: item.shopInfo['longitude']
							});
						});
					}
				} else {
					uni.showToast({
						title: res.msg,
						icon:"none"
					})
				}
			});
		},
		getUserOrder(data) {
			// 获取用户订单
			post('order/list', data).then(res => {
				if (res.code === 200) {
					this.orders = res.data;
					console.log('請求訂單，',typeof this.outSn,typeof this.orders.length)
					if(this.outSn && this.orders.length < 1){
						uni.navigateTo({
							url: 'loan?sn=' + this.outSn
						});
					}
				}
			});
		}
	}
};
</script>

<style lang="scss">
@import url('../../assets/scss/icon.scss');
button {
	border: none;
	&::after {
		display: none;
	}
}
.content {
	height: 100vh;
}
.map {
	width: 100vw;
	height: 100vh;
	position: absolute;
	z-index: 1;
	bottom: 0;
	left: 0;
}
.map-center {
	width: 24rpx;
	height: 44rpx;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -40rpx;
	transform: translateX(-50%);
	z-index: 50;
}
.user-layer {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff;
	z-index: 100;
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 30rpx;
	.user-post {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
		border: 4rpx solid #22a6f1;
		flex: 0 0 auto;
	}

	.text {
		font-size: 28rpx;
		color: #333333;
		flex: 1 0 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 20rpx;
	}
	.shop {
		height: 60rpx;
		border-radius: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		background: #22a6f1;
		font-size: 28rpx;
		padding: 0 20rpx;
		border: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.icon {
			width: 30rpx;
			height: 30rpx;
			margin-right: 4rpx;
		}
	}
}
.option-scan {
	position: fixed;
	bottom: 120rpx;
	z-index: 90;
	height: 90rpx;
	line-height: 90rpx;
	text-align: center;
	font-size: 30rpx;
	color: #ffffff;
	background: #22a6f1;
	border-radius: 90rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 360rpx;
	left: 50%;
	transform: translateX(-50%);
	.icon {
		width: 44rpx;
		height: 44rpx;
		margin-right: 20rpx;
		background-size: cover;
	}
}
.task {
	width: 560rpx;
	height: 120rpx;
	border-radius: 120rpx;
	background: #ffffff;
	box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
	position: fixed;
	top: 120rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 30rpx;
	.battery {
		flex: 0 0 auto;
		width: 24rpx;
		height: 44rpx;
		background-size: cover;
	}
	.info {
		width: 100rpx;
		flex: 1 0 auto;
		display: flex;
		flex-direction: column;
		margin: 0 20rpx;
		.top {
			font-size: 28rpx;
			color: #333333;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.bottom {
			font-size: 24rpx;
			color: #999;
		}
	}
	.more {
		height: 60rpx;
		line-height: 60rpx;
		border-radius: 60rpx;
		text-align: center;
		background: none;
		border: 2rpx solid #22a6f1;
		font-size: 28rpx;
		color: #22a6f1;
		padding: 0 20rpx;
	}
}
.right-option {
	width: 72rpx;
	position: fixed;
	right: 30rpx;
	z-index: 100;
	top: 50%;
	transform: translateY(-50%);
	.location {
		width: 72rpx;
		height: 72rpx;
		border-radius: 72rpx;
		background: #ffffff;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		.icon-location {
			width: 48rpx;
			height: 48rpx;
			background-size: cover;
		}
	}
	.call-me {
		width: 72rpx;
		height: 72rpx;
		border-radius: 72rpx;
		background: #ffffff;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			width: 48rpx;
			height: 48rpx;
			background-size: cover;
		}
	}
}
.store-box {
	position: fixed;
	z-index: 100;
	bottom: 120rpx;
	margin: 0 30rpx;
	left: 0;
	right: 0;
}
</style>
