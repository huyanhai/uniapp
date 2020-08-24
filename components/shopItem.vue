<!--
 * @Author: huyanhai
 * @since: 2020-04-19 11:48:57
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 17:38:16
 * @FilePath: /uniapp/components/shopItem.vue
 * @Description: 门店
 -->
<template>
  <view class="stores-content" v-if="show">
    <view class="top">
	 <image :src="item.headImg" @click="goShopDetails(item.stringId)" class="post"></image>
      <view class="info" @click="goShopDetails(item.stringId)">
        <view class="name">{{item.shopName}}</view>
        <view class="address">地址：{{item.address || ''}}</view>
        <view class="time">营业时间：{{`${item.startTime || ''}-${item.endTime || ''}`}}</view>
      </view>
	  <text class="dis-num">{{parseInt(item.distance || 0)}}米</text>
    </view>
    <view class="bottom">
      <view class="data-item">
        可租借：
        <text class="num">{{item.canBorrowQuantity}}</text>
      </view>
      <view class="data-item">
        可归还：
        <text class="num">{{item.returnableQuantity}}</text>
      </view>

      <view class="data-item">
		  <view class="gos"  @click="goMap">
			  <view class="go icon-go"></view>
			  到这去
		  </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    item: {
      type: Object
    },
    show: {
      type: Boolean,
      default: true
    },
	latitude:{
		type:Number
	},
	longitude:{
		type:Number
	}
  },
  methods: {
    goMap() {
      let that = this;
      uni.openLocation({
        latitude: parseFloat(that.item.latitude),
        longitude: parseFloat(that.item.longitude),
        name: that.item.shopName,
        address: that.item.address,
        success: function() {
          console.log("success");
        },
        fail(e) {
          console.log(e);
        }
      });
    },
	goShopDetails(e) {
		let stringId = e || "";
		uni.navigateTo({
		  url: `shopDetail?stringId=${stringId}&longitude=${this.longitude}&latitude=${this.latitude}` 
		});
	}
  }
};
</script>

<style lang="scss">
.stores-content {
  background: #fff;
  border-radius: 12rpx;
  box-shadow: 0 0 10rpx rgba($color: #000000, $alpha: 0.1);
  box-sizing: border-box;
  padding: 30rpx;
  .top {
    display: flex;
    align-items: center;
    justify-content: space-between;
	position: relative;
	.dis-num{
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		font-size: 22rpx;
		color: #999999;
	}
    .post {
      width: 120rpx;
      height: 120rpx;
	  background: gary;
      border-radius: 10rpx;
      overflow: hidden;
      flex: 0 0 auto;
    }
    .info {
      flex: 1 0 auto;
      width: 100rpx;
      line-height: 40rpx;
      margin: 0 20rpx;
      .name {
        font-size: 28rpx;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .address {
        font-size: 24rpx;
        color: 24rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #999;
      }
      .time {
        font-size: 24rpx;
        color: #999;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    .data-item {
      font-size: 24rpx;
      color: #666;
      .num {
        color: #FFC600;
        font-size: 24rpx;
      }
	  .gos{
		  display: flex;
		  align-items: center;
		  font-size: 22rpx;
		  color: #333333;
		  .go {
			width: 21rpx;
			height: 21rpx;
			background-size: cover;
			margin-right: 10rpx;
		  }
	  }
    }
  }
}
</style>