<!--
 * @Author: huyanhai
 * @since: 2020-04-19 17:48:04
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 22:39:52
 * @FilePath: /uniapp/pages/index/order.vue
 * @Description: 我的订单
 -->
<template>
  <view class="order-content">
    <orderItem :item="item" v-for="(item,index) in orderData" :key="index"/>
  </view>
</template>

<script>
import orderItem from "../../components/orderItem.vue";
import { get,post } from "../../libs/request.js"
export default {
  data() {
    return {
		orderData:[]
	};
  },
  onLoad() {},
  components: {
    orderItem
  },
  onShow(){
	  this.getMyOrder();
  },
  methods:{
	  // 获取我的订单
	  getMyOrder(){
		  post('order/list',{}).then(res=>{
			  if(res.code === 200){
				  this.orderData = res.data
			  }
		  })
	  }
  }
};
</script>

<style lang="scss">
@import url("../../assets/scss/icon.scss");
.order-content {
  width: 100vw;
  height: 100vh;
  background: #f8f8f9;
  padding: 30rpx;
  box-sizing: border-box;
  .order-item-content {
    margin-bottom: 30rpx;
  }
}
</style>