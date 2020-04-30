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
      <image
		@click="goShopDetails"
        class="post"
        :src="item.shopImage"
      />
      <view class="info" @click="goShopDetails">
        <view class="name">{{item.shopName}}</view>
        <view class="address">地址：{{item.address || ''}}</view>
        <view class="time">营业时间：{{`${item.startTime}-${item.endTime}`}}</view>
      </view>
      <view class="go icon-go" @click="goMap"></view>
    </view>
    <view class="bottom">
      <view class="data-item">
        可租借：
        <text class="num">2</text>
      </view>
      <view class="data-item">
        可归还：
        <text class="num">2</text>
      </view>

      <view class="data-item">
        距离：
        <text class="num">2</text>
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
    }
  },
  methods: {
    goMap() {
      let that = this;
      console.log(that.item);
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
		uni.navigateTo({
		  url: "shopDetail"
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
    .post {
      width: 120rpx;
      height: 120rpx;
      border-radius: 120rpx;
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
    .go {
      width: 60rpx;
      height: 60rpx;
      background-size: cover;
    }
  }
  .bottom {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    .data-item {
      font-size: 26rpx;
      color: #666;
      .num {
        color: #22a6f1;
        font-size: 26rpx;
      }
    }
  }
}
</style>