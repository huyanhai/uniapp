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
	<text class="no-order" v-if="shopData.length<1">近期暂无商家</text>
    <shopItem v-for="(item,index) in shopData" :key="index" :item="item.shopInfo"/>
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
		background: #F8F8F9;
		padding: 30rpx;
		box-sizing: border-box;
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