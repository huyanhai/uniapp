<!--
 * @Author: huyanhai
 * @since: 2020-04-18 20:06:47
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 15:07:23
 * @FilePath: /uniapp/components/loginSheet.vue
 * @Description: 
 -->
<template>
  <cover-view class="login-sheet" disable-scroll="true">
    <cover-view class="model">
      <cover-view class="box">
        <cover-view class="title">白名单授权</cover-view>
        <cover-view class="text">每单免费两小时</cover-view>
      </cover-view>
	  <cover-image class="img-s" src="http://wd-qidian.oss-cn-beijing.aliyuncs.com/mini/icon-zjtips.png"></cover-image>
      <!-- #ifdef MP-ALIPAY -->
      <cover-view>
        <button
          open-type="getAuthorize"
          type="primary"
          @getAuthorize="onGetAuthorize"
          onerror="onAuthError"
          scope="userInfo"
          class="auth-button"
        >授权</button>
      </cover-view>
      <!-- #endif -->
      <!-- #ifdef MP-WEIXIN -->
      <button
        open-type="getUserInfo"
        type="primary"
        lang="zh_CN"
        @getuserinfo="onGetAuthorize"
        class="auth-button"
      >授权</button>
      <!-- #endif -->
    </cover-view>
  </cover-view>
</template>

<script>
import { userLogin } from "../../libs/auth.js";
export default {
  data() {
    return {
		agentId:null
	};
  },
  // #ifdef MP-WEIXIN
  onLoad(options) {
  	  let datas = decodeURIComponent(options.q);
  	  this.agentId = this.getId(datas,'id')
  	  uni.clearStorageSync('authCode')
  },
  // #endif
  // #ifdef MP-ALIPAY
  onLoad(options) {
  	  var App = getApp();
  	  this.agentId = App.agentId;
  	  uni.clearStorageSync('authCode');
  },
  // #endif
  methods: {
	  getId(url,name){
		  var reg = new RegExp("[^\?&]?" + encodeURI(name) + "=[^&]+");
		  var arr = url.match(reg);
		  if (arr != null) {
			return decodeURI(arr[0].substring(arr[0].search("=") + 1));
		  }
		  return "";
	  },
    async onGetAuthorize() {
      // 授权成功
	  let data = await userLogin(this.agentId);
      if(data){
		  uni.navigateTo({
		  	url:"index"
		  })
	  }
    },
    onAuthError() {
      uni.showToast({
		  icon:"none",
		  title:"授权失败，重新授权"
	  });
    }
  }
};
</script>

<style lang="scss">
	@import url("../../assets/scss/icon.scss");
	
.login-sheet {
  background: rgba($color: #000000, $alpha: 0.2);
  position: absolute;
  width: 100%;
  height: 100vh;
  z-index: 100;
  top: 0;
  left: 0;
  overflow: hidden;
  .model {
    width: 100%;
    bottom: 0;
    position: absolute;
    padding: 50rpx;
	height: 100vh;
    box-sizing: border-box;
    z-index: 110;
	background: #FFFFFF;
	
    .title {
      font-size: 40rpx;
      color: #333;
	  margin-top: 70rpx;
	  text-align: center;
    }
	.img-s{
		width: 428rpx;
		height: 350rpx;
		margin: 120rpx auto 80rpx auto;
		display: block;
	}
    .box .text {
      display: block;
      color: #9d9d9d;
      font-size: 12px;
      margin-top: 10rpx;
      margin-bottom: 30rpx;
	  text-align: center;
    }

    .auth-button {
      border-radius: 10rpx;
      font-size: 30rpx;
      height: 40px;
      line-height: 40px;
	  background: #303030;
	  border-radius: 50px;
	  color: #FFDD00;
    }
  }
}
</style>
