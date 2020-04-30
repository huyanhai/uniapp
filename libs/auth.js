import {post} from "./request.js"
// 获取授权名
export function getOauthName() {
    let name;
    uni.getProvider({
        service: 'oauth',
        success(e) {
            name = e.provider[0];
        }
    });
    return name;
}

// 用户登录
export function userLogin() {
    let name = getOauthName();
    return new Promise((resolve, reject) => {
        uni.login({
            provider: name,
            scopes: 'auth_user',
            success: function(loginRes) {
				console.log('------',loginRes)
                uni.getUserInfo({
                    provider: name,
                    success: function(infoRes) {
                        uni.setStorageSync('user_info', infoRes.userInfo);
						let data = Object.assign(loginRes,infoRes)
						post('login/weixin',{
							code: data.code,
							encryptedData: data.encryptedData,
							iv: data.iv
						}).then(res=>{
							console.log('res',res);
							if(res.code === 200) {
								uni.setStorageSync('authCode',res.data)
								console.log('res',res);
							} else {
								uni.showToast({
									title: res.msg,
									icon: 'none'
								})
							}
						})
                        resolve(data);
                    },
                    fail(err) {
                        reject(err);
                    }
                });
            },
            fail(err) {
                reject(err);
            }
        });
    })
}

// 获取当前位置
export function getLocation() {
    return new Promise((resolve, reject) => {
        uni.getLocation({
            success: function(res) {
                uni.setStorageSync('user_address', res);
                resolve(res);
            },
            fail(e) {
                uni.showToast({
					title:'获取定位失败'
				});
                reject(err);
            }
        });
    })
}

// 获取已经授权的信息
export function getSetting() {
    return new Promise((resolve, reject) => {
        uni.getSetting({
            success: function(res) {
                let data = res.authSetting;
            },
            fail(e) {
                uni.showToast('获取定位失败');
                reject(err);
            }
        });
    })
}