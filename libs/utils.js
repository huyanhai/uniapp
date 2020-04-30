/*
 * @Author: huyanhai
 * @since: 2020-04-19 13:57:16
 * @LastAuthor: huyanhai
 * @lastTime: 2020-04-19 14:04:05
 * @FilePath: /uniapp/libs/utils.js
 * @Description:工具库
 */

export function scan() {
  // 只允许通过相机扫码
  return new Promise((resolve, reject) => {
    uni.scanCode({
      onlyFromCamera: true,
      success: function (res) {
        resolve(res);
        console.log("条码类型：" + res.scanType);
        console.log("条码内容：" + res.result);
      },
      fail(e) {
        uni.showToast({
			title:"扫码失败"
		});
        reject(e);
      },
    });
  });
}
