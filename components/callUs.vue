<!--
 * @Author: huyanhai
 * @since: 2020-04-19 13:28:03
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 16:26:09
 * @FilePath: /uniapp/components/callUs.vue
 * @Description: 联系客服
 -->
<template>
  <cover-view class="call-us-content" v-if="show">
    <cover-view class="call-us-layer">
      <cover-view class="close icon-close" @click="close"></cover-view>
      <cover-view class="tel-icon icon-tel"></cover-view>
      <cover-view class="tips">欢迎使用起电共享充电宝！</cover-view>
      <cover-view class="tel">客服热线：18183045955</cover-view>
      <button class="call" @click="call">联系客服</button>
    </cover-view>
  </cover-view>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    close() {
      this.$emit("update:show", false);
    },
    call() {
      uni.makePhoneCall({
        phoneNumber: "18183045955" //仅为示例
      });
    }
  }
};
</script>

<style lang="scss">
@import url("../assets/scss/icon.scss");
.call-us-content {
  background: rgba($color: #000000, $alpha: 0.3);
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 100;
  top: 0;
  left: 0;
  .call-us-layer {
    width: 690rpx;
    background: #ffffff;
    border-radius: 24rpx;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 30rpx;
    box-sizing: border-box;
    .close {
      width: 44rpx;
      height: 44rpx;
      background-size: cover;
      position: absolute;
      right: 30rpx;
      top: 30rpx;
    }
    .tel-icon {
      width: 158rpx;
      height: 158rpx;
      background-size: cover;
      margin: 0 auto;
    }
    .tips {
      font-size: 24rpx;
      color: #999;
      text-align: center;
    }
    .tel {
      font-size: 32rpx;
      color: #333333;
      text-align: center;
      margin: 50rpx 0;
    }
    .call {
      margin: 0 auto;
      height: 90rpx;
      width: 360rpx;
      text-align: center;
      color: #ffffff;
      background: #22a6f1;
      line-height: 90rpx;
      border-radius: 90rpx;
      font-size: 28rpx;
    }
  }
}
</style>