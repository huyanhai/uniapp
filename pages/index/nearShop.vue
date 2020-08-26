<!--
 * @Author: huyanhai
 * @since: 2020-04-19 17:48:04
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 17:49:46
 * @FilePath: /uniapp/pages/index/nearShop.vue
 * @Description: 附件的门店
 -->
<template>
  <view class="near-shop">
  <view class="searchs">
	<image class="img" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/search.png" mode=""></image>
	<input type="text" v-model="shopName" placeholder="搜索附近充电宝网点"/>
	<view class="btn" @click="getNearData">搜索</view>
  </view>
	<text class="no-order" v-if="shopData.length<1">附近暂无商家</text>
    <shopItem v-for="(item,index) in shopData" :key="index" :item="item.shopInfo" :latitude.sync="latitude" :longitude.sync="longitude"/>
  </view>
</template>

<script>
import shopItem from "../../components/shopItem";
import { get,post } from "../../libs/request.js"

export default {
  data() {
    return {
		latitude:null,
		longitude:null,
		shopName:"",
		shopData:[]
	};
  },
  onLoad(e) {
	  this.latitude = e.latitude || '';
	  this.longitude = e.longitude || '';
  },
  onShow(){
	  this.getNearData();
  },
  components: {
    shopItem
  },
  methods:{
	  getNearData(){
		  post('shop/nearby',{
		    "shopName": this.shopName,
			"lat": this.latitude,
			"lng": this.longitude,
			"range":2000
		  }).then(res=>{
			  if(res.code === 200){
				  this.shopData = res.data;
			  }
		  })
	  }
  }
};
</script>

<style lang="scss">
	@import url("../../assets/scss/icon.scss");
	.near-shop{
		width: 100vw;
		height: 100vh;
		background: #fff;
		padding: 30rpx;
		box-sizing: border-box;
		.searchs{
			height: 60rpx;
			line-height: 60rpx;
			background: #F2F2F2;
			border-radius: 10rpx;
			display: flex;
			align-items: center;
			font-size: 24rpx;
			color: #999999;
			margin-bottom: 30rpx;
			margin-right: 100rpx;
			position: relative;
			padding: 0 20rpx;
			input{
				background: none;
				font-size: 24rpx;
			}
			.img{
				width: 26rpx;
				height: 26rpx;
				margin-right: 10rpx;
				
			}
			.btn{
				position: absolute;
				width: 80rpx;
				height: 60rpx;
				right: -100rpx;
				text-align: center;
				// background: #303030;
				color: #303030;
				border-radius: 10rpx;
			}
		}
		.stores-content{
			margin-bottom: 30rpx;
		}
		.no-order{
			  position: absolute;
			  top: 50%;
			  left: 50%;
			  transform: translate(-50%,-50%);
		}
	}
</style>