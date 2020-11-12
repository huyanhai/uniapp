<template>
	<view class="content" disable-scroll="true">
		<!-- #ifdef MP-ALIPAY -->
		<button
		  open-type="getAuthorize"
		  type="primary"
		  @getAuthorize="onGetAuthorize('user')"
		  onerror="onAuthError"
		  scope="userInfo"
		  class="user-layer"
		  v-if="!authCode"
		>
			<image :src="userInfo.headUrl" class="user-post" @click="goUser" />
			<view class="text">欢迎使用起电！</view>
			<button class="shop" @click="goNearShop">
				<view class="icon icon-shop"></view>
				附近商家
			</button>
		</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button
			open-type="getUserInfo"
			type="primary"
			lang="zh_CN"
			@getuserinfo="onGetAuthorize('user')"
			class="user-layer"
			v-if="!authCode"
		>
			<image :src="userInfo.headUrl" class="user-post" @click="goUser" />
			<view class="text">欢迎使用起电！</view>
			<button class="shop" @click="goNearShop">
				<view class="icon icon-shop"></view>
				附近商家
			</button>
		</button>
		<!-- #endif -->
		<view class="user-layer" v-else>
			<image :src="userInfo.headUrl" class="user-post" @click="goUser" />
			<view class="text">欢迎使用起电！</view>
			<button class="shop" @click="goNearShop">
				<view class="icon icon-shop"></view>
				附近商家
			</button>
		</view>
		<cover-view class="search" @click="goLocations">
			<cover-image class="img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/search.png"></cover-image>
			<cover-view>搜索附近充电宝网点</cover-view>
		</cover-view>
		<view class="task" v-if="orders.length > 0">
			<icon class="battery icon-battery" />
			<view class="info">
				<view class="top">{{ orders.length }}个订单租借中……</view>
				<view class="bottom">可归还至其他商家</view>
			</view>
			<button class="more" @click="goOrderDetails(orders[0])">查看详情</button>
		</view>
		<!-- #ifdef MP-ALIPAY -->
		<button
		  open-type="getAuthorize"
		  type="primary"
		  @getAuthorize="onGetAuthorize('code')"
		  onerror="onAuthError"
		  scope="userInfo"
		  class="option-scan"
		  v-if="!authCode"
		>
			<view class="icon icon-scan"></view>
			扫一扫借用
		</button>
		<!-- #endif -->
		<!-- #ifdef MP-WEIXIN -->
		<button
			open-type="getUserInfo"
			type="primary"
			lang="zh_CN"
			@getuserinfo="onGetAuthorize('code')"
			class="option-scan"
			v-if="!authCode"
		>
			<view class="icon icon-scan"></view>
			扫一扫借用
		</button>
		<!-- #endif -->
		<view class="option-scan" @click="scanCode" v-else>
			<view class="icon icon-scan"></view>
			扫一扫借用
		</view>
		<view class="right-option">
			<view class="location" @click="goLocation"><view class="icon-location"></view></view>
			<view class="call-me" @click="callMe"><view class="icon icon-call"></view></view>
		</view>
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
		<cover-image src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-lo.png" class="map-center"></cover-image>
		<view class="store-box"><shopItem :show="showShopItem" :item="shopItemData" :latitude.sync="addressInfo.latitude" :longitude.sync="addressInfo.longitude"/></view>
	</view>
</template>

<script>
import shopItem from '../../components/shopItem';
import { getLocation, getSetting } from '../../libs/auth.js';
import { scan } from '../../libs/utils';
import { get, post } from '../../libs/request.js';
import { userLogin } from "../../libs/auth.js";
let interstitialAd = null
export default {
	data() {
		return {
			markers: [],
			authCode:null,
			addressInfo: {},
			userInfo: null,
			shopItemData: {},
			showShopItem: false,
			orders: {}, // 是否有租借中的订单
			outSn:"",
			scale:14,
			can:{
				can:true,
				msg:null
			} // 是否可以租借
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
	onLoad(e) {
		// #ifdef MP-WEIXIN
		let datas = decodeURIComponent((e || {}).q);
		if(datas && datas !== "undefined"){
			let code = datas.split('/');
			this.outSn = code[code.length - 1] || "";
		}
		if (wx.createInterstitialAd) {
		  interstitialAd = wx.createInterstitialAd({
		    adUnitId: 'adunit-5599b42df986bca2'
		  })
		  
		  console.log("",interstitialAd)
		  interstitialAd.onLoad(() => {
			  console.log("广告加载成功")
		  })
		  interstitialAd.onError((err) => {
			  console.log("广告加载失败")
		  })
		  interstitialAd.onClose(() => {
			  console.log("广告加载关闭")
		  })
		  interstitialAd.show().catch((err) => {
			  console.error(err)
			})
		}
		// #endif
		
	},
	async onShow(){
		let client = 0;
		// #ifdef MP-ALIPAY
		client = 2
		// #endif
		// #ifdef MP-WEIXIN
		client = 1
		// #endif
		if(this.outSn){
			this.checkDevice({
				client:client,
				driverId: this.outSn
			})
		} else {
			this.checkAuth();
			this.addressInfo = await getLocation();
		}
	},
	onHide(){
		this.outSn = '';
	},
	components: {
		shopItem
	},
	methods: {
		checkAuth() {
			let that = this;
			this.authCode = uni.getStorageSync('authCode');
			this.addressInfo = uni.getStorageSync('user_address') || null;
			if(!this.addressInfo){
				this.checkAddress();
			} else {
				this.getNearDevice({
					lat: that.addressInfo['latitude'],
					lng: that.addressInfo['longitude'],
					range: 2000
				});
			}
			
			if(this.authCode && this.addressInfo){
				this.canGet()
				this.getUserInfo();
				this.getUserOrder({
					leaseStatus: 2
				});
			}
			
		},
		async checkDevice(data){
			let _this = this
			let datas = await post("driver/portal/certification",data).then(res=>{
				if (res.code === 200 && !res.hasNext) {
					setTimeout(function(){
						uni.redirectTo({
							url:"forAlipay"
						})
					},3000)
				} else {
					return true
				}
			})
			if(datas){
				_this.checkAuth();
				_this.addressInfo = await getLocation();
			}
		},
		async checkAddress() {
			let that = this;
			that.addressInfo = await getLocation();
			if(that.addressInfo){
				that.getNearDevice({
					lat: that.addressInfo['latitude'],
					lng: that.addressInfo['longitude'],
					range: 2000
				});
			}
		},
		getUserInfo(){
			return get('/login/info').then(res => {
				if(res.code === 200){
					return this.userInfo = res.data
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
			uni.makePhoneCall({
			  phoneNumber: "17783847895" //仅为示例
			});
		},
		async scanCode() {
			if (!this.can) {
				uni.showToast({
					title: this.can.msg,
					icon: 'none'
				});
				return false
			}
			let data = await scan();
			// 扫码
			if (data.result) {
				// 扫码成功后跳转
				let no = data.result;
				let sn;
				if(no && no !== "undefined" && no.indexOf("?") < 0){
				 let code = no.split('/');
				 sn = code[code.length - 1];
				} else {
				 let parmes = no.split("?")[1];
				 if(!parmes) return;
				 let parme = parmes.split("&").forEach((item)=>{
					let str = item.split("=");
					if(str[0] === "cabid"){
					 sn = str[1]
					}
				 })
				}
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
			if (e.type === 'end' && e.causedBy === 'drag') {
				that.scale = e.scale;
				let content = uni.createMapContext('map', this);
				content.getCenterLocation({
					success(res) {
						that.addressInfo['latitude'] = (res || {}).latitude;
						that.addressInfo['longitude'] =(res || {}).longitude;
						that.getNearDevice({
							lat: that.addressInfo['latitude'],
							lng: that.addressInfo['longitude'],
							range: 2000
						});
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
				if (res.code === 200) {
					let data = res.data;
					if (data.length > 0) {
						that.markers = [];
						data.map((item, index) => {
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
			return post('order/list', data).then(res => {
				if (res.code === 200) {
					this.orders = res.data;
					return res.data
				}
			});
		},
		// 是否可以租借
		canGet(){
			return post('order/qualification').then(res => {
				if (res.code === 200) {
					this.can = {
						can:res.data,
						msg:res.msg
					};
					if(this.outSn && res.data){
						uni.navigateTo({
							url: 'loan?sn=' + this.outSn
						});
					}
					return this.can
				}
			});
		},
		goLocations(){
			let _this = this
			uni.chooseLocation({
			  latitude: _this.addressInfo.latitude,
			  longitude: _this.addressInfo.longitude,
			  success: function(e) {
				  const {latitude,longitude} = e
				  let content = uni.createMapContext('map',this)
				  content.moveToLocation({
					  longitude:longitude,
					  latitude:latitude,
					  success:function(){},
					  fail:function(){}
				  })
			  },
			  fail(e) {
			    console.log(e);
			  }
			});

		},
		// 授权操作
		async onGetAuthorize(type) {
		  // 授权成功
		  let _this = this;
		  let data = await userLogin();
		  if(data){
			this.authCode = data
			let user = await this.getUserInfo()
			// let can = await this.canGet() || {}
			let order = await this.getUserOrder({leaseStatus: 2})
			if(type === 'code' && can.can){
				_this.scanCode()
			}
			if(type==='user' && user){
				uni.navigateTo({
					url:"userInfo"
				})
			}
		  }
		},
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
.search{
	position: fixed;
	top: 120rpx;
	background: #FFFFFF;
	height: 66rpx;
	left: 30rpx;
	right: 30rpx;
	border-radius: 80rpx;
	z-index: 100;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 24rpx;
	color: #999999;
	.img{
		width: 26rpx;
		height: 26rpx;
		margin-right: 20rpx;
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
	width: 36rpx;
	height: 60rpx;
	position: absolute;
	left: 50%;
	top: 50%;
	margin-top: -56rpx;
	transform: translateX(-50%);
	z-index: 50;
}
.user-layer {
	position: fixed;
	top: 0;
	width: 100%;
	height: 100rpx;
	background: #ffffff !important;
	z-index: 100;
	overflow: hidden;
	display: flex !important;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 30rpx;
	border-radius: 0 !important;
	.user-post {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
		flex: 0 0 auto;
		background: url("http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/mrtx.png") no-repeat;
		background-size: cover;
	}

	.text {
		font-size: 28rpx;
		color: #FFC600;
		flex: 1 0 auto;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		margin-left: 20rpx;
		text-align: left;
	}
	.shop {
		height: 60rpx;
		border-radius: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #FFDD00;
		background: #303030;
		font-size: 24rpx;
		padding: 0 20rpx;
		border: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.icon {
			width: 24rpx;
			height: 22rpx;
			margin-right: 4rpx;
		}
	}
}
.option-scan {
	position: fixed;
	bottom: 60rpx;
	z-index: 90;
	height: 80rpx;
	line-height: 80rpx;
	text-align: center;
	font-size: 30rpx;
	color: #FFDD00 !important;
	background: #303030 !important;
	border-radius: 90rpx;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 380rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 10000;
	.icon {
		width: 35rpx;
		height: 35rpx;
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
	top: 210rpx;
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
		border: 2rpx solid #303030;
		font-size: 28rpx;
		color: #303030;
		padding: 0 20rpx;
	}
}
.right-option {
	width: 100%;
	position: fixed;
	left: 0rpx;
	z-index: 100;
	bottom: 68rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	box-sizing: border-box;
	padding: 0 40rpx;
	.location {
		width: 64rpx;
		height: 64rpx;
		border-radius: 64rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		.icon-location {
			width: 64rpx;
			height: 64rpx;
			background-size: cover;
		}
	}
	.call-me {
		width: 64rpx;
		height: 64rpx;
		border-radius: 64rpx;
		box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
		display: flex;
		align-items: center;
		justify-content: center;
		.icon {
			width: 64rpx;
			height: 64rpx;
			background-size: cover;
		}
	}
}
.store-box {
	position: fixed;
	z-index: 10000;
	bottom: 160rpx;
	margin: 0 30rpx;
	left: 0;
	right: 0;
}
</style>
